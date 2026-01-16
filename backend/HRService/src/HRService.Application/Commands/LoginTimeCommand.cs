using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to log in (start work) for the day
/// </summary>
public class LoginTimeCommand : IRequest<LoginTimeResult>
{
    public Guid StaffId { get; set; }
    public DateTime LoginTime { get; set; } = DateTime.UtcNow;
}

public class LoginTimeResult
{
    public bool Success { get; set; }
    public Guid? TimeLogId { get; set; }
    public string? ErrorMessage { get; set; }
}
