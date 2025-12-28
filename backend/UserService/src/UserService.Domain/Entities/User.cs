namespace UserService.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public bool MfaEnabled { get; set; }
    public string? MfaSecret { get; set; }
    public string? GoogleId { get; set; }
    public string? MicrosoftId { get; set; }
    public UserRole Role { get; set; } = UserRole.User;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;
}

public enum UserRole
{
    User = 0,
    Admin = 1
}
