using MediatR;
using MongoDB.Driver;
using HRService.Application.Queries;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class GetTodayTimeLogQueryHandler : IRequestHandler<GetTodayTimeLogQuery, TimeLog?>
{
    private readonly MongoDbContext _mongoContext;

    public GetTodayTimeLogQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<TimeLog?> Handle(GetTodayTimeLogQuery request, CancellationToken cancellationToken)
    {
        var today = DateTime.UtcNow.Date;
        return await _mongoContext.TimeLogs
            .Find(t => t.StaffId == request.StaffId && t.Date == today)
            .FirstOrDefaultAsync(cancellationToken);
    }
}

public class GetTimeLogsQueryHandler : IRequestHandler<GetTimeLogsQuery, List<TimeLog>>
{
    private readonly MongoDbContext _mongoContext;

    public GetTimeLogsQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<List<TimeLog>> Handle(GetTimeLogsQuery request, CancellationToken cancellationToken)
    {
        var filter = Builders<TimeLog>.Filter.And(
            Builders<TimeLog>.Filter.Eq(t => t.StaffId, request.StaffId),
            Builders<TimeLog>.Filter.Gte(t => t.Date, request.StartDate.Date),
            Builders<TimeLog>.Filter.Lte(t => t.Date, request.EndDate.Date)
        );

        return await _mongoContext.TimeLogs
            .Find(filter)
            .SortBy(t => t.Date)
            .ToListAsync(cancellationToken);
    }
}

public class GetMonthlyTimeLogSummaryQueryHandler : IRequestHandler<GetMonthlyTimeLogSummaryQuery, MonthlyTimeLogSummary>
{
    private readonly MongoDbContext _mongoContext;

    public GetMonthlyTimeLogSummaryQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<MonthlyTimeLogSummary> Handle(GetMonthlyTimeLogSummaryQuery request, CancellationToken cancellationToken)
    {
        var startDate = new DateTime(request.Year, request.Month, 1);
        var endDate = startDate.AddMonths(1).AddDays(-1);

        // Get time logs for the month
        var filter = Builders<TimeLog>.Filter.And(
            Builders<TimeLog>.Filter.Eq(t => t.StaffId, request.StaffId),
            Builders<TimeLog>.Filter.Gte(t => t.Date, startDate),
            Builders<TimeLog>.Filter.Lte(t => t.Date, endDate)
        );

        var timeLogs = await _mongoContext.TimeLogs
            .Find(filter)
            .SortBy(t => t.Date)
            .ToListAsync(cancellationToken);

        // Get holidays for the month
        var holidayFilter = Builders<Holiday>.Filter.And(
            Builders<Holiday>.Filter.Gte(h => h.Date, startDate),
            Builders<Holiday>.Filter.Lte(h => h.Date, endDate)
        );
        var holidays = await _mongoContext.Holidays
            .Find(holidayFilter)
            .ToListAsync(cancellationToken);

        var holidayDates = holidays.Select(h => h.Date.Date).ToHashSet();

        // Calculate summary
        var totalWorkDays = timeLogs.Count;
        var totalWorkHours = timeLogs.Sum(t => t.TotalWorkHours);
        var totalBreakHours = timeLogs.Sum(t => t.TotalBreakHours);
        var netWorkHours = timeLogs.Sum(t => t.NetWorkHours);

        // Count weekends and holidays
        var weekendDays = 0;
        var holidayDays = holidays.Count;
        var daysInMonth = DateTime.DaysInMonth(request.Year, request.Month);

        for (int day = 1; day <= daysInMonth; day++)
        {
            var date = new DateTime(request.Year, request.Month, day);
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
            {
                weekendDays++;
            }
        }

        var expectedWorkDays = daysInMonth - weekendDays - holidayDays;

        // Create daily logs
        var dailyLogs = new List<DailyTimeLogData>();
        for (int day = 1; day <= daysInMonth; day++)
        {
            var date = new DateTime(request.Year, request.Month, day);
            var timeLog = timeLogs.FirstOrDefault(t => t.Date.Date == date.Date);
            var isWeekend = date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
            var isHoliday = holidayDates.Contains(date.Date);

            dailyLogs.Add(new DailyTimeLogData
            {
                Date = date,
                WorkHours = timeLog?.TotalWorkHours ?? 0,
                BreakHours = timeLog?.TotalBreakHours ?? 0,
                NetHours = timeLog?.NetWorkHours ?? 0,
                IsWeekend = isWeekend,
                IsHoliday = isHoliday
            });
        }

        return new MonthlyTimeLogSummary
        {
            TotalWorkDays = totalWorkDays,
            TotalWorkHours = totalWorkHours,
            TotalBreakHours = totalBreakHours,
            NetWorkHours = netWorkHours,
            AverageWorkHoursPerDay = totalWorkDays > 0 ? netWorkHours / totalWorkDays : 0,
            ExpectedWorkDays = expectedWorkDays,
            WeekendDays = weekendDays,
            HolidayDays = holidayDays,
            DailyLogs = dailyLogs
        };
    }
}
