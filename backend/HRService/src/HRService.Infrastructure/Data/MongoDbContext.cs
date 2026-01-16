using MongoDB.Driver;
using HRService.Domain.Entities;

namespace HRService.Infrastructure.Data;

/// <summary>
/// MongoDB context for HR Service time tracking and staff management
/// </summary>
public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(MongoDbSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        _database = client.GetDatabase(settings.DatabaseName);
    }

    public IMongoCollection<Staff> Staff => 
        _database.GetCollection<Staff>("staff");

    public IMongoCollection<TimeLog> TimeLogs => 
        _database.GetCollection<TimeLog>("timelogs");

    public IMongoCollection<Holiday> Holidays => 
        _database.GetCollection<Holiday>("holidays");

    public IMongoCollection<WorkHoursSummary> WorkHoursSummaries => 
        _database.GetCollection<WorkHoursSummary>("workhourssummary");
}
