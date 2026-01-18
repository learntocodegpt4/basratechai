using MediatR;
using Microsoft.AspNetCore.Mvc;
using HRService.Application.Commands;
using HRService.Application.Queries;

namespace HRService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HolidaysController : ControllerBase
{
    private readonly IMediator _mediator;

    public HolidaysController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Add a holiday (Admin only)
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddHoliday([FromBody] AddHolidayCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            holidayId = result.HolidayId,
            message = "Holiday added successfully"
        });
    }

    /// <summary>
    /// Get holidays for a date range
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetHolidays(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate)
    {
        var query = new GetHolidaysQuery
        {
            StartDate = startDate,
            EndDate = endDate
        };
        var holidays = await _mediator.Send(query);

        return Ok(holidays);
    }

    /// <summary>
    /// Get holidays for a specific month
    /// </summary>
    [HttpGet("{year}/{month}")]
    public async Task<IActionResult> GetMonthHolidays(int year, int month)
    {
        var query = new GetMonthHolidaysQuery
        {
            Year = year,
            Month = month
        };
        var holidays = await _mediator.Send(query);

        return Ok(holidays);
    }
}
