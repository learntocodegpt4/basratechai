using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to onboard a new staff member (Admin only)
/// </summary>
public class OnboardStaffCommand : IRequest<OnboardStaffResult>
{
    public Guid UserId { get; set; } // Reference to User in UserService
    public string StaffId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string Designation { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public DateTime JoiningDate { get; set; }
    public string? Address { get; set; }
    
    // Emergency Contact
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactRelationship { get; set; }
    public string? EmergencyContactPhone { get; set; }
    
    // Bank Details
    public string? BankName { get; set; }
    public string? AccountNumber { get; set; }
    public string? IfscCode { get; set; }
    public string? AccountHolderName { get; set; }
    
    public Guid? CreatedBy { get; set; } // Admin user ID
}

public class OnboardStaffResult
{
    public bool Success { get; set; }
    public Guid? StaffId { get; set; }
    public string? ErrorMessage { get; set; }
}
