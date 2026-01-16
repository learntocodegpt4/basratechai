using MediatR;
using HRService.Domain.Entities;

namespace HRService.Application.Queries;

/// <summary>
/// Query to get staff by ID
/// </summary>
public class GetStaffByIdQuery : IRequest<Staff?>
{
    public Guid StaffId { get; set; }
}

/// <summary>
/// Query to get staff by user ID
/// </summary>
public class GetStaffByUserIdQuery : IRequest<Staff?>
{
    public Guid UserId { get; set; }
}

/// <summary>
/// Query to get all staff members (Admin only)
/// </summary>
public class GetAllStaffQuery : IRequest<List<Staff>>
{
    public bool? IncludeInactive { get; set; } = false;
}
