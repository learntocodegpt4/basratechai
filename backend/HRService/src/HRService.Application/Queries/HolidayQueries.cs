using MediatR;
using HRService.Domain.Entities;

namespace HRService.Application.Queries;

/// <summary>
/// Query to get holidays for a date range
/// </summary>
public class GetHolidaysQuery : IRequest<List<Holiday>>
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

/// <summary>
/// Query to get holidays for a specific month
/// </summary>
public class GetMonthHolidaysQuery : IRequest<List<Holiday>>
{
    public int Month { get; set; }
    public int Year { get; set; }
}
