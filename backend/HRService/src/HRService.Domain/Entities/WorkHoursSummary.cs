using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRService.Domain.Entities;

/// <summary>
/// Monthly work hours summary for staff dashboard
/// </summary>
public class WorkHoursSummary
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; } = Guid.NewGuid();

    [BsonElement("staffId")]
    [BsonRepresentation(BsonType.String)]
    public Guid StaffId { get; set; }

    [BsonElement("month")]
    public int Month { get; set; }

    [BsonElement("year")]
    public int Year { get; set; }

    [BsonElement("totalWorkDays")]
    public int TotalWorkDays { get; set; } // Days actually worked

    [BsonElement("totalWorkHours")]
    public double TotalWorkHours { get; set; }

    [BsonElement("totalBreakHours")]
    public double TotalBreakHours { get; set; }

    [BsonElement("netWorkHours")]
    public double NetWorkHours { get; set; }

    [BsonElement("expectedWorkDays")]
    public int ExpectedWorkDays { get; set; } // Total days in month - weekends - holidays

    [BsonElement("weekendDays")]
    public int WeekendDays { get; set; }

    [BsonElement("holidayDays")]
    public int HolidayDays { get; set; }

    [BsonElement("averageWorkHoursPerDay")]
    public double AverageWorkHoursPerDay { get; set; }

    [BsonElement("generatedAt")]
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
