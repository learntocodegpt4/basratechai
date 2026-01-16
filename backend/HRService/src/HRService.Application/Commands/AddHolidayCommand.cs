using MediatR;

namespace HRService.Application.Commands;

/// <summary>
/// Command to add a holiday (Admin only)
/// </summary>
public class AddHolidayCommand : IRequest<AddHolidayResult>
{
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public bool IsRecurring { get; set; }
    public string? Description { get; set; }
    public Guid? CreatedBy { get; set; }
}

public class AddHolidayResult
{
    public bool Success { get; set; }
    public Guid? HolidayId { get; set; }
    public string? ErrorMessage { get; set; }
}
