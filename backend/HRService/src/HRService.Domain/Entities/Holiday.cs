using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRService.Domain.Entities;

/// <summary>
/// Holiday entity for managing company holidays
/// </summary>
public class Holiday
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; } = Guid.NewGuid();

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("isRecurring")]
    public bool IsRecurring { get; set; } = false; // If true, applies every year

    [BsonElement("description")]
    public string? Description { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("createdBy")]
    [BsonRepresentation(BsonType.String)]
    public Guid? CreatedBy { get; set; } // Admin who created this
}
