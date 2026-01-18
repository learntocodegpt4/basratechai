using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to update existing staff information (Admin only)
/// </summary>
public class UpdateStaffCommand : IRequest<UpdateStaffResult>
{
    public Guid StaffId { get; set; }
    public string? Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Designation { get; set; }
    public string? Department { get; set; }
    public string? Address { get; set; }
    public bool? IsActive { get; set; }
    
    // Emergency Contact
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactRelationship { get; set; }
    public string? EmergencyContactPhone { get; set; }
    
    // Bank Details
    public string? BankName { get; set; }
    public string? AccountNumber { get; set; }
    public string? IfscCode { get; set; }
    public string? AccountHolderName { get; set; }
}

public class UpdateStaffResult
{
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}
