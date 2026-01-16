using MediatR;
using HRService.Domain.Entities;

namespace HRService.Application.Queries;

/// <summary>
/// Query to get today's time log for a staff member
/// </summary>
public class GetTodayTimeLogQuery : IRequest<TimeLog?>
{
    public Guid StaffId { get; set; }
}

/// <summary>
/// Query to get time logs for a date range
/// </summary>
public class GetTimeLogsQuery : IRequest<List<TimeLog>>
{
    public Guid StaffId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

/// <summary>
/// Query to get monthly summary
/// </summary>
public class GetMonthlyTimeLogSummaryQuery : IRequest<MonthlyTimeLogSummary>
{
    public Guid StaffId { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
}

public class MonthlyTimeLogSummary
{
    public int TotalWorkDays { get; set; }
    public double TotalWorkHours { get; set; }
    public double TotalBreakHours { get; set; }
    public double NetWorkHours { get; set; }
    public double AverageWorkHoursPerDay { get; set; }
    public int ExpectedWorkDays { get; set; }
    public int WeekendDays { get; set; }
    public int HolidayDays { get; set; }
    public List<DailyTimeLogData> DailyLogs { get; set; } = new();
}

public class DailyTimeLogData
{
    public DateTime Date { get; set; }
    public double WorkHours { get; set; }
    public double BreakHours { get; set; }
    public double NetHours { get; set; }
    public bool IsWeekend { get; set; }
    public bool IsHoliday { get; set; }
}
