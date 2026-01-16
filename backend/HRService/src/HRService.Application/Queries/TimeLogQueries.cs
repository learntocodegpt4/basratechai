using MediatR;
using HRService.Domain.Entities;
using System.Text.Json.Serialization;

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
    [JsonPropertyName("totalWorkDays")]
    public int TotalWorkDays { get; set; }
    
    [JsonPropertyName("totalWorkHours")]
    public double TotalWorkHours { get; set; }
    
    [JsonPropertyName("totalBreakHours")]
    public double TotalBreakHours { get; set; }
    
    [JsonPropertyName("netWorkHours")]
    public double NetWorkHours { get; set; }
    
    [JsonPropertyName("averageWorkHoursPerDay")]
    public double AverageWorkHoursPerDay { get; set; }
    
    [JsonPropertyName("expectedWorkDays")]
    public int ExpectedWorkDays { get; set; }
    
    [JsonPropertyName("weekendDays")]
    public int WeekendDays { get; set; }
    
    [JsonPropertyName("holidayDays")]
    public int HolidayDays { get; set; }
    
    [JsonPropertyName("dailyLogs")]
    public List<DailyTimeLogData> DailyLogs { get; set; } = new();
}

public class DailyTimeLogData
{
    [JsonPropertyName("date")]
    public DateTime Date { get; set; }
    
    [JsonPropertyName("workHours")]
    public double WorkHours { get; set; }
    
    [JsonPropertyName("breakHours")]
    public double BreakHours { get; set; }
    
    [JsonPropertyName("netHours")]
    public double NetHours { get; set; }
    
    [JsonPropertyName("isWeekend")]
    public bool IsWeekend { get; set; }
    
    [JsonPropertyName("isHoliday")]
    public bool IsHoliday { get; set; }
}
