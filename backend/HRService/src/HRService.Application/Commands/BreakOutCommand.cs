using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to end a break and resume work
/// </summary>
public class BreakOutCommand : IRequest<BreakOutResult>
{
    public Guid StaffId { get; set; }
    public DateTime BreakOutTime { get; set; } = DateTime.UtcNow;
}

public class BreakOutResult
{
    public bool Success { get; set; }
    public double? BreakDuration { get; set; } // In hours
    public string? ErrorMessage { get; set; }
}
