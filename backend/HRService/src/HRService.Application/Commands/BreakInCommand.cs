using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to start a break
/// </summary>
public class BreakInCommand : IRequest<BreakInResult>
{
    public Guid StaffId { get; set; }
    public DateTime BreakInTime { get; set; } = DateTime.UtcNow;
    public string? BreakType { get; set; } // e.g., "Tea Break", "Lunch Break"
    public string? Comment { get; set; }
}

public class BreakInResult
{
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}
