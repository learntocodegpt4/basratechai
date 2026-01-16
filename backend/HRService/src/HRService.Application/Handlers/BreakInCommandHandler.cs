using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class BreakInCommandHandler : IRequestHandler<BreakInCommand, BreakInResult>
{
    private readonly MongoDbContext _mongoContext;

    public BreakInCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<BreakInResult> Handle(BreakInCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var today = request.BreakInTime.Date;

            // Find today's time log
            var timeLog = await _mongoContext.TimeLogs
                .Find(t => t.StaffId == request.StaffId && t.Date == today)
                .FirstOrDefaultAsync(cancellationToken);

            if (timeLog == null)
            {
                return new BreakInResult
                {
                    Success = false,
                    ErrorMessage = "No login record found for today. Please login first."
                };
            }

            if (timeLog.Status == TimeLogStatus.OnBreak)
            {
                return new BreakInResult
                {
                    Success = false,
                    ErrorMessage = "You are already on a break"
                };
            }

            // Create new break log
            var breakLog = new BreakLog
            {
                BreakInTime = request.BreakInTime,
                BreakType = request.BreakType,
                Comment = request.Comment,
                Duration = 0
            };

            // Add break to time log
            timeLog.Breaks.Add(breakLog);

            var filter = Builders<TimeLog>.Filter.Eq(t => t.Id, timeLog.Id);
            var update = Builders<TimeLog>.Update
                .Set(t => t.Breaks, timeLog.Breaks)
                .Set(t => t.Status, TimeLogStatus.OnBreak)
                .Set(t => t.UpdatedAt, DateTime.UtcNow);

            await _mongoContext.TimeLogs.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);

            return new BreakInResult
            {
                Success = true
            };
        }
        catch (Exception ex)
        {
            return new BreakInResult
            {
                Success = false,
                ErrorMessage = $"Error starting break: {ex.Message}"
            };
        }
    }
}
