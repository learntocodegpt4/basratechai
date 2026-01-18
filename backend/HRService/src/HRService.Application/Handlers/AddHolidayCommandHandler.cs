using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class AddHolidayCommandHandler : IRequestHandler<AddHolidayCommand, AddHolidayResult>
{
    private readonly MongoDbContext _mongoContext;

    public AddHolidayCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<AddHolidayResult> Handle(AddHolidayCommand request, CancellationToken cancellationToken)
    {
        try
        {
            // Check if holiday already exists for this date
            var existingHoliday = await _mongoContext.Holidays
                .Find(h => h.Date.Date == request.Date.Date && h.Name == request.Name)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingHoliday != null)
            {
                return new AddHolidayResult
                {
                    Success = false,
                    ErrorMessage = "Holiday already exists for this date"
                };
            }

            var holiday = new Holiday
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Date = request.Date.Date,
                IsRecurring = request.IsRecurring,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            await _mongoContext.Holidays.InsertOneAsync(holiday, cancellationToken: cancellationToken);

            return new AddHolidayResult
            {
                Success = true,
                HolidayId = holiday.Id
            };
        }
        catch (Exception ex)
        {
            return new AddHolidayResult
            {
                Success = false,
                ErrorMessage = $"Error adding holiday: {ex.Message}"
            };
        }
    }
}
