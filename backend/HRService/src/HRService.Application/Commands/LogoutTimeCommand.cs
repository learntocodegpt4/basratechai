using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to log out (end work) for the day
/// </summary>
public class LogoutTimeCommand : IRequest<LogoutTimeResult>
{
    public Guid StaffId { get; set; }
    public DateTime LogoutTime { get; set; } = DateTime.UtcNow;
}

public class LogoutTimeResult
{
    public bool Success { get; set; }
    public double? TotalWorkHours { get; set; }
    public double? NetWorkHours { get; set; }
    public string? ErrorMessage { get; set; }
}
