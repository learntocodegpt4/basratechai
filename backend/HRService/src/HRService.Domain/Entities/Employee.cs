namespace HRService.Domain.Entities;

public class Employee
{
    public Guid Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public DateTime JoiningDate { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal HRA { get; set; }
    public decimal Conveyance { get; set; }
    public decimal OtherAllowances { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    // Navigation property
    public ICollection<SalarySlip> SalarySlips { get; set; } = new List<SalarySlip>();
}

public class SalarySlip
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string Month { get; set; } = string.Empty;
    public int Year { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal HRA { get; set; }
    public decimal Conveyance { get; set; }
    public decimal OtherAllowances { get; set; }
    public decimal GrossSalary { get; set; }
    public decimal ProvidentFund { get; set; }
    public decimal Tax { get; set; }
    public decimal NetSalary { get; set; }
    public int WorkDays { get; set; }
    public int LeaveDays { get; set; }
    public DateTime GeneratedAt { get; set; }
    public string? PdfPath { get; set; }

    // Navigation property
    public Employee Employee { get; set; } = null!;
}
