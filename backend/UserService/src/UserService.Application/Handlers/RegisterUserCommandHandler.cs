using MediatR;
using Microsoft.EntityFrameworkCore;
using UserService.Application.Commands;
using UserService.Domain.Entities;
using UserService.Infrastructure.Data;

namespace UserService.Application.Handlers;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
{
    private readonly UserDbContext _context;

    public RegisterUserCommandHandler(UserDbContext context)
    {
        _context = context;
    }

    public async Task<RegisterUserResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        // Check if user already exists
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (existingUser != null)
        {
            return new RegisterUserResult
            {
                Success = false,
                ErrorMessage = "User with this email already exists"
            };
        }

        // Hash password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        // Create new user
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = passwordHash,
            Name = request.Name,
            MfaEnabled = request.EnableMfa,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        return new RegisterUserResult
        {
            Success = true,
            UserId = user.Id,
            Email = user.Email
        };
    }
}
