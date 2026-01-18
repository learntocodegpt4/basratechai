namespace HRService.Infrastructure.Data;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = "mongodb://admin:mongo123@localhost:27017";
    public string DatabaseName { get; set; } = "basratech_hr";
    public string StaffCollectionName { get; set; } = "staff";
    public string TimeLogCollectionName { get; set; } = "timelogs";
    public string HolidayCollectionName { get; set; } = "holidays";
    public string WorkHoursSummaryCollectionName { get; set; } = "workhourssummary";
}
