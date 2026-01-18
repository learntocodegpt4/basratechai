using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRService.Domain.Entities;

/// <summary>
/// Staff entity for MongoDB - handles complete employee onboarding and information
/// </summary>
public class Staff
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; } = Guid.NewGuid();

    [BsonElement("staffId")]
    public string StaffId { get; set; } = string.Empty;

    [BsonElement("userId")]
    [BsonRepresentation(BsonType.String)]
    public Guid UserId { get; set; } // Reference to User in UserService

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("phoneNumber")]
    public string? PhoneNumber { get; set; }

    [BsonElement("designation")]
    public string Designation { get; set; } = string.Empty;

    [BsonElement("department")]
    public string Department { get; set; } = string.Empty;

    [BsonElement("joiningDate")]
    public DateTime JoiningDate { get; set; }

    [BsonElement("address")]
    public string? Address { get; set; }

    [BsonElement("emergencyContact")]
    public EmergencyContact? EmergencyContact { get; set; }

    [BsonElement("bankDetails")]
    public BankDetails? BankDetails { get; set; }

    [BsonElement("documents")]
    public List<StaffDocument> Documents { get; set; } = new();

    [BsonElement("isActive")]
    public bool IsActive { get; set; } = true;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("createdBy")]
    [BsonRepresentation(BsonType.String)]
    public Guid? CreatedBy { get; set; } // Admin who created this record
}

public class EmergencyContact
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("relationship")]
    public string Relationship { get; set; } = string.Empty;

    [BsonElement("phoneNumber")]
    public string PhoneNumber { get; set; } = string.Empty;
}

public class BankDetails
{
    [BsonElement("bankName")]
    public string BankName { get; set; } = string.Empty;

    [BsonElement("accountNumber")]
    public string AccountNumber { get; set; } = string.Empty;

    [BsonElement("ifscCode")]
    public string IfscCode { get; set; } = string.Empty;

    [BsonElement("accountHolderName")]
    public string AccountHolderName { get; set; } = string.Empty;
}

public class StaffDocument
{
    [BsonElement("documentType")]
    public string DocumentType { get; set; } = string.Empty; // e.g., "Resume", "ID Proof", "Address Proof"

    [BsonElement("documentUrl")]
    public string DocumentUrl { get; set; } = string.Empty;

    [BsonElement("uploadedAt")]
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}
