using MediatR;
using MongoDB.Driver;
using HRService.Application.Queries;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class GetHolidaysQueryHandler : IRequestHandler<GetHolidaysQuery, List<Holiday>>
{
    private readonly MongoDbContext _mongoContext;

    public GetHolidaysQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<List<Holiday>> Handle(GetHolidaysQuery request, CancellationToken cancellationToken)
    {
        var filterBuilder = Builders<Holiday>.Filter;
        var filter = filterBuilder.Empty;

        if (request.StartDate.HasValue && request.EndDate.HasValue)
        {
            filter = filterBuilder.And(
                filterBuilder.Gte(h => h.Date, request.StartDate.Value.Date),
                filterBuilder.Lte(h => h.Date, request.EndDate.Value.Date)
            );
        }
        else if (request.StartDate.HasValue)
        {
            filter = filterBuilder.Gte(h => h.Date, request.StartDate.Value.Date);
        }
        else if (request.EndDate.HasValue)
        {
            filter = filterBuilder.Lte(h => h.Date, request.EndDate.Value.Date);
        }

        return await _mongoContext.Holidays
            .Find(filter)
            .SortBy(h => h.Date)
            .ToListAsync(cancellationToken);
    }
}

public class GetMonthHolidaysQueryHandler : IRequestHandler<GetMonthHolidaysQuery, List<Holiday>>
{
    private readonly MongoDbContext _mongoContext;

    public GetMonthHolidaysQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<List<Holiday>> Handle(GetMonthHolidaysQuery request, CancellationToken cancellationToken)
    {
        var startDate = new DateTime(request.Year, request.Month, 1);
        var endDate = startDate.AddMonths(1).AddDays(-1);

        var filter = Builders<Holiday>.Filter.And(
            Builders<Holiday>.Filter.Gte(h => h.Date, startDate),
            Builders<Holiday>.Filter.Lte(h => h.Date, endDate)
        );

        return await _mongoContext.Holidays
            .Find(filter)
            .SortBy(h => h.Date)
            .ToListAsync(cancellationToken);
    }
}
