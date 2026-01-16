using MediatR;
using Microsoft.AspNetCore.Mvc;
using HRService.Application.Commands;
using HRService.Application.Queries;

namespace HRService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TimeTrackingController : ControllerBase
{
    private readonly IMediator _mediator;

    public TimeTrackingController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Login - Start work for the day
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginTimeCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            timeLogId = result.TimeLogId,
            message = "Logged in successfully"
        });
    }

    /// <summary>
    /// Logout - End work for the day
    /// </summary>
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutTimeCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            totalWorkHours = result.TotalWorkHours,
            netWorkHours = result.NetWorkHours,
            message = "Logged out successfully"
        });
    }

    /// <summary>
    /// Break In - Start a break
    /// </summary>
    [HttpPost("break-in")]
    public async Task<IActionResult> BreakIn([FromBody] BreakInCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new { message = "Break started successfully" });
    }

    /// <summary>
    /// Break Out - End a break
    /// </summary>
    [HttpPost("break-out")]
    public async Task<IActionResult> BreakOut([FromBody] BreakOutCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            breakDuration = result.BreakDuration,
            message = "Break ended successfully"
        });
    }

    /// <summary>
    /// Get today's time log
    /// </summary>
    [HttpGet("today/{staffId}")]
    public async Task<IActionResult> GetTodayTimeLog(Guid staffId)
    {
        var query = new GetTodayTimeLogQuery { StaffId = staffId };
        var timeLog = await _mediator.Send(query);

        if (timeLog == null)
        {
            return NotFound(new { error = "No time log found for today" });
        }

        return Ok(timeLog);
    }

    /// <summary>
    /// Get time logs for a date range
    /// </summary>
    [HttpGet("logs/{staffId}")]
    public async Task<IActionResult> GetTimeLogs(
        Guid staffId,
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        var query = new GetTimeLogsQuery
        {
            StaffId = staffId,
            StartDate = startDate,
            EndDate = endDate
        };
        var timeLogs = await _mediator.Send(query);

        return Ok(timeLogs);
    }

    /// <summary>
    /// Get monthly summary with charts data
    /// </summary>
    [HttpGet("summary/{staffId}/{year}/{month}")]
    public async Task<IActionResult> GetMonthlySummary(Guid staffId, int year, int month)
    {
        var query = new GetMonthlyTimeLogSummaryQuery
        {
            StaffId = staffId,
            Month = month,
            Year = year
        };
        var summary = await _mediator.Send(query);

        return Ok(summary);
    }
}
