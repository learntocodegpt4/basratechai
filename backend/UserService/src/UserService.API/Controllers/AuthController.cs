using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Commands;

namespace UserService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            userId = result.UserId,
            email = result.Email,
            message = "User registered successfully"
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return Unauthorized(new { error = result.ErrorMessage });
        }

        if (result.MfaRequired)
        {
            return Ok(new
            {
                mfaRequired = true,
                userId = result.UserId,
                message = "MFA verification required"
            });
        }

        return Ok(new
        {
            token = result.Token,
            userId = result.UserId,
            email = result.Email,
            name = result.Name
        });
    }
}
