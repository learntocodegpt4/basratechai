using MediatR;
using Microsoft.EntityFrameworkCore;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class GenerateSalarySlipCommandHandler : IRequestHandler<GenerateSalarySlipCommand, GenerateSalarySlipResult>
{
    private readonly HRDbContext _context;

    public GenerateSalarySlipCommandHandler(HRDbContext context)
    {
        _context = context;
    }

    public async Task<GenerateSalarySlipResult> Handle(GenerateSalarySlipCommand request, CancellationToken cancellationToken)
    {
        // Verify employee exists
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            return new GenerateSalarySlipResult
            {
                Success = false,
                ErrorMessage = "Employee not found"
            };
        }

        // Calculate salary components
        var grossSalary = request.BasicSalary + request.HRA + request.Conveyance + request.OtherAllowances;
        var providentFund = request.BasicSalary * 0.12m; // 12% PF
        var tax = grossSalary * 0.1m; // 10% tax (simplified)
        var netSalary = grossSalary - providentFund - tax;

        // Create salary slip
        var salarySlip = new SalarySlip
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            Month = request.Month,
            Year = request.Year,
            BasicSalary = request.BasicSalary,
            HRA = request.HRA,
            Conveyance = request.Conveyance,
            OtherAllowances = request.OtherAllowances,
            GrossSalary = grossSalary,
            ProvidentFund = providentFund,
            Tax = tax,
            NetSalary = netSalary,
            WorkDays = request.WorkDays,
            LeaveDays = request.LeaveDays,
            GeneratedAt = DateTime.UtcNow
        };

        _context.SalarySlips.Add(salarySlip);
        await _context.SaveChangesAsync(cancellationToken);

        return new GenerateSalarySlipResult
        {
            Success = true,
            SalarySlipId = salarySlip.Id,
            NetSalary = netSalary
        };
    }
}
