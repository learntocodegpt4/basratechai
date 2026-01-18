using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class LoginTimeCommandHandler : IRequestHandler<LoginTimeCommand, LoginTimeResult>
{
    private readonly MongoDbContext _mongoContext;

    public LoginTimeCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<LoginTimeResult> Handle(LoginTimeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var today = request.LoginTime.Date;

            // Check if there's already a time log for today
            var existingLog = await _mongoContext.TimeLogs
                .Find(t => t.StaffId == request.StaffId && t.Date == today)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingLog != null)
            {
                // Update existing log
                var filter = Builders<TimeLog>.Filter.Eq(t => t.Id, existingLog.Id);
                var update = Builders<TimeLog>.Update
                    .Set(t => t.LoginTime, request.LoginTime)
                    .Set(t => t.Status, TimeLogStatus.LoggedIn)
                    .Set(t => t.UpdatedAt, DateTime.UtcNow);

                await _mongoContext.TimeLogs.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);

                return new LoginTimeResult
                {
                    Success = true,
                    TimeLogId = existingLog.Id
                };
            }
            else
            {
                // Create new time log
                var timeLog = new TimeLog
                {
                    Id = Guid.NewGuid(),
                    StaffId = request.StaffId,
                    Date = today,
                    LoginTime = request.LoginTime,
                    Status = TimeLogStatus.LoggedIn,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                await _mongoContext.TimeLogs.InsertOneAsync(timeLog, cancellationToken: cancellationToken);

                return new LoginTimeResult
                {
                    Success = true,
                    TimeLogId = timeLog.Id
                };
            }
        }
        catch (Exception ex)
        {
            return new LoginTimeResult
            {
                Success = false,
                ErrorMessage = $"Error logging in: {ex.Message}"
            };
        }
    }
}
