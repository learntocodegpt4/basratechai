using MediatR;

namespace HRService.Application.Commands;

public class GenerateSalarySlipCommand : IRequest<GenerateSalarySlipResult>
{
    public Guid EmployeeId { get; set; }
    public string Month { get; set; } = string.Empty;
    public int Year { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal HRA { get; set; }
    public decimal Conveyance { get; set; }
    public decimal OtherAllowances { get; set; }
    public int WorkDays { get; set; }
    public int LeaveDays { get; set; }
}

public class GenerateSalarySlipResult
{
    public bool Success { get; set; }
    public Guid SalarySlipId { get; set; }
    public string? ErrorMessage { get; set; }
    public decimal NetSalary { get; set; }
}
