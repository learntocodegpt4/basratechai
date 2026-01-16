using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class LogoutTimeCommandHandler : IRequestHandler<LogoutTimeCommand, LogoutTimeResult>
{
    private readonly MongoDbContext _mongoContext;

    public LogoutTimeCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<LogoutTimeResult> Handle(LogoutTimeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var today = request.LogoutTime.Date;

            // Find today's time log
            var timeLog = await _mongoContext.TimeLogs
                .Find(t => t.StaffId == request.StaffId && t.Date == today)
                .FirstOrDefaultAsync(cancellationToken);

            if (timeLog == null)
            {
                return new LogoutTimeResult
                {
                    Success = false,
                    ErrorMessage = "No login record found for today"
                };
            }

            if (timeLog.LoginTime == null)
            {
                return new LogoutTimeResult
                {
                    Success = false,
                    ErrorMessage = "Please login first"
                };
            }

            // Calculate total work hours
            var totalWorkHours = (request.LogoutTime - timeLog.LoginTime.Value).TotalHours;

            // Calculate total break hours
            var totalBreakHours = timeLog.Breaks.Sum(b => b.Duration);

            // Calculate net work hours
            var netWorkHours = totalWorkHours - totalBreakHours;

            // Update time log
            var filter = Builders<TimeLog>.Filter.Eq(t => t.Id, timeLog.Id);
            var update = Builders<TimeLog>.Update
                .Set(t => t.LogoutTime, request.LogoutTime)
                .Set(t => t.TotalWorkHours, totalWorkHours)
                .Set(t => t.TotalBreakHours, totalBreakHours)
                .Set(t => t.NetWorkHours, netWorkHours)
                .Set(t => t.Status, TimeLogStatus.LoggedOut)
                .Set(t => t.UpdatedAt, DateTime.UtcNow);

            await _mongoContext.TimeLogs.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);

            return new LogoutTimeResult
            {
                Success = true,
                TotalWorkHours = totalWorkHours,
                NetWorkHours = netWorkHours
            };
        }
        catch (Exception ex)
        {
            return new LogoutTimeResult
            {
                Success = false,
                ErrorMessage = $"Error logging out: {ex.Message}"
            };
        }
    }
}
