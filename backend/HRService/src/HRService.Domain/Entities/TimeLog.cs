using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRService.Domain.Entities;

/// <summary>
/// Time log entity for tracking staff work hours, breaks, login/logout times
/// </summary>
public class TimeLog
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; } = Guid.NewGuid();

    [BsonElement("staffId")]
    [BsonRepresentation(BsonType.String)]
    public Guid StaffId { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; } // Date of the log (date only, no time)

    [BsonElement("loginTime")]
    public DateTime? LoginTime { get; set; }

    [BsonElement("logoutTime")]
    public DateTime? LogoutTime { get; set; }

    [BsonElement("breaks")]
    public List<BreakLog> Breaks { get; set; } = new();

    [BsonElement("totalWorkHours")]
    public double TotalWorkHours { get; set; } // In hours

    [BsonElement("totalBreakHours")]
    public double TotalBreakHours { get; set; } // In hours

    [BsonElement("netWorkHours")]
    public double NetWorkHours { get; set; } // TotalWorkHours - TotalBreakHours

    [BsonElement("status")]
    public TimeLogStatus Status { get; set; } = TimeLogStatus.LoggedOut;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class BreakLog
{
    [BsonElement("breakInTime")]
    public DateTime BreakInTime { get; set; }

    [BsonElement("breakOutTime")]
    public DateTime? BreakOutTime { get; set; }

    [BsonElement("breakType")]
    public string? BreakType { get; set; } // Optional: "Tea Break", "Lunch Break", etc.

    [BsonElement("comment")]
    public string? Comment { get; set; }

    [BsonElement("duration")]
    public double Duration { get; set; } // In hours
}

public enum TimeLogStatus
{
    LoggedIn,
    OnBreak,
    LoggedOut
}
