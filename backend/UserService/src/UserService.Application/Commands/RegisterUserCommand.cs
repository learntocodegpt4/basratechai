using MediatR;

namespace UserService.Application.Commands;

public class RegisterUserCommand : IRequest<RegisterUserResult>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool EnableMfa { get; set; }
}

public class RegisterUserResult
{
    public Guid UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}
