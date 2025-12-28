using MediatR;
using Microsoft.AspNetCore.Mvc;
using HRService.Application.Commands;

namespace HRService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalarySlipsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SalarySlipsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> GenerateSalarySlip([FromBody] GenerateSalarySlipCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(new { error = result.ErrorMessage });
        }

        return Ok(new
        {
            salarySlipId = result.SalarySlipId,
            netSalary = result.NetSalary,
            message = "Salary slip generated successfully"
        });
    }
}
