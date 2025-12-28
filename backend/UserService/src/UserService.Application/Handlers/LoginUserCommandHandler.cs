using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Application.Commands;
using UserService.Infrastructure.Data;

namespace UserService.Application.Handlers;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoginUserResult>
{
    private readonly UserDbContext _context;
    private readonly IConfiguration _configuration;

    public LoginUserCommandHandler(UserDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginUserResult> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        // Find user
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user == null || !user.IsActive)
        {
            return new LoginUserResult
            {
                Success = false,
                ErrorMessage = "Invalid email or password"
            };
        }

        // Verify password
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return new LoginUserResult
            {
                Success = false,
                ErrorMessage = "Invalid email or password"
            };
        }

        // Check if MFA is required
        if (user.MfaEnabled)
        {
            return new LoginUserResult
            {
                Success = true,
                MfaRequired = true,
                UserId = user.Id,
                Email = user.Email,
                Name = user.Name
            };
        }

        // Generate JWT token
        var token = GenerateJwtToken(user);

        // Update last login
        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        return new LoginUserResult
        {
            Success = true,
            Token = token,
            UserId = user.Id,
            Email = user.Email,
            Name = user.Name,
            MfaRequired = false
        };
    }

    private string GenerateJwtToken(Domain.Entities.User user)
    {
        var jwtSecret = _configuration["JWT:Secret"] ?? "your-super-secret-jwt-key-change-this-in-production";
        var jwtExpiry = int.Parse(_configuration["JWT:Expiry"] ?? "3600");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"] ?? "BasraTechAI",
            audience: _configuration["JWT:Audience"] ?? "BasraTechAI",
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(jwtExpiry),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
