using MediatR;
using MongoDB.Driver;
using HRService.Application.Queries;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class GetStaffByIdQueryHandler : IRequestHandler<GetStaffByIdQuery, Staff?>
{
    private readonly MongoDbContext _mongoContext;

    public GetStaffByIdQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<Staff?> Handle(GetStaffByIdQuery request, CancellationToken cancellationToken)
    {
        return await _mongoContext.Staff
            .Find(s => s.Id == request.StaffId)
            .FirstOrDefaultAsync(cancellationToken);
    }
}

public class GetStaffByUserIdQueryHandler : IRequestHandler<GetStaffByUserIdQuery, Staff?>
{
    private readonly MongoDbContext _mongoContext;

    public GetStaffByUserIdQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<Staff?> Handle(GetStaffByUserIdQuery request, CancellationToken cancellationToken)
    {
        return await _mongoContext.Staff
            .Find(s => s.UserId == request.UserId)
            .FirstOrDefaultAsync(cancellationToken);
    }
}

public class GetAllStaffQueryHandler : IRequestHandler<GetAllStaffQuery, List<Staff>>
{
    private readonly MongoDbContext _mongoContext;

    public GetAllStaffQueryHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<List<Staff>> Handle(GetAllStaffQuery request, CancellationToken cancellationToken)
    {
        var filter = request.IncludeInactive == true 
            ? Builders<Staff>.Filter.Empty 
            : Builders<Staff>.Filter.Eq(s => s.IsActive, true);

        return await _mongoContext.Staff
            .Find(filter)
            .ToListAsync(cancellationToken);
    }
}
