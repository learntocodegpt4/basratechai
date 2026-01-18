using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class BreakOutCommandHandler : IRequestHandler<BreakOutCommand, BreakOutResult>
{
    private readonly MongoDbContext _mongoContext;

    public BreakOutCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<BreakOutResult> Handle(BreakOutCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var today = request.BreakOutTime.Date;

            // Find today's time log
            var timeLog = await _mongoContext.TimeLogs
                .Find(t => t.StaffId == request.StaffId && t.Date == today)
                .FirstOrDefaultAsync(cancellationToken);

            if (timeLog == null)
            {
                return new BreakOutResult
                {
                    Success = false,
                    ErrorMessage = "No login record found for today"
                };
            }

            if (timeLog.Status != TimeLogStatus.OnBreak)
            {
                return new BreakOutResult
                {
                    Success = false,
                    ErrorMessage = "You are not currently on a break"
                };
            }

            // Find the last break without break out time
            var lastBreak = timeLog.Breaks.LastOrDefault(b => b.BreakOutTime == null);
            if (lastBreak == null)
            {
                return new BreakOutResult
                {
                    Success = false,
                    ErrorMessage = "No active break found"
                };
            }

            // Calculate break duration
            lastBreak.BreakOutTime = request.BreakOutTime;
            lastBreak.Duration = (request.BreakOutTime - lastBreak.BreakInTime).TotalHours;

            // Calculate total break hours
            var totalBreakHours = timeLog.Breaks.Sum(b => b.Duration);

            var filter = Builders<TimeLog>.Filter.Eq(t => t.Id, timeLog.Id);
            var update = Builders<TimeLog>.Update
                .Set(t => t.Breaks, timeLog.Breaks)
                .Set(t => t.TotalBreakHours, totalBreakHours)
                .Set(t => t.Status, TimeLogStatus.LoggedIn)
                .Set(t => t.UpdatedAt, DateTime.UtcNow);

            await _mongoContext.TimeLogs.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);

            return new BreakOutResult
            {
                Success = true,
                BreakDuration = lastBreak.Duration
            };
        }
        catch (Exception ex)
        {
            return new BreakOutResult
            {
                Success = false,
                ErrorMessage = $"Error ending break: {ex.Message}"
            };
        }
    }
}
