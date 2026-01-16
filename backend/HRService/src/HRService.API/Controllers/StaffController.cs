using MediatR;
using Microsoft.AspNetCore.Mvc;
using HRService.Application.Commands;
using HRService.Application.Queries;

namespace HRService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly IMediator _mediator;

    public StaffController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Onboard a new staff member (Admin only)
    /// </summary>
    [HttpPost("onboard")]
    public async Task<IActionResult> OnboardStaff([FromBody] OnboardStaffCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            staffId = result.StaffId,
            message = "Staff onboarded successfully"
        });
    }

    /// <summary>
    /// Update staff information (Admin only)
    /// </summary>
    [HttpPut("{staffId}")]
    public async Task<IActionResult> UpdateStaff(Guid staffId, [FromBody] UpdateStaffCommand command)
    {
        command.StaffId = staffId;
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new { message = "Staff updated successfully" });
    }

    /// <summary>
    /// Get staff by ID
    /// </summary>
    [HttpGet("{staffId}")]
    public async Task<IActionResult> GetStaffById(Guid staffId)
    {
        var query = new GetStaffByIdQuery { StaffId = staffId };
        var staff = await _mediator.Send(query);

        if (staff == null)
        {
            return NotFound(new { error = "Staff not found" });
        }

        return Ok(staff);
    }

    /// <summary>
    /// Get staff by user ID
    /// </summary>
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetStaffByUserId(Guid userId)
    {
        var query = new GetStaffByUserIdQuery { UserId = userId };
        var staff = await _mediator.Send(query);

        if (staff == null)
        {
            return NotFound(new { error = "Staff not found for this user" });
        }

        return Ok(staff);
    }

    /// <summary>
    /// Get all staff members (Admin only)
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllStaff([FromQuery] bool includeInactive = false)
    {
        var query = new GetAllStaffQuery { IncludeInactive = includeInactive };
        var staff = await _mediator.Send(query);

        return Ok(staff);
    }
}
