using Microsoft.EntityFrameworkCore;
using HRService.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add PostgreSQL DbContext for existing Employee/SalarySlip functionality
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=basratech_hr;Username=postgres;Password=postgres123";
builder.Services.AddDbContext<HRDbContext>(options =>
    options.UseNpgsql(connectionString));

// Add MongoDB for new Staff/TimeTracking functionality
var mongoSettings = new MongoDbSettings
{
    ConnectionString = builder.Configuration.GetValue<string>("MongoDB:ConnectionString") 
        ?? "mongodb://admin:mongo123@localhost:27017",
    DatabaseName = builder.Configuration.GetValue<string>("MongoDB:DatabaseName") 
        ?? "basratech_hr"
};
builder.Services.AddSingleton(mongoSettings);
builder.Services.AddSingleton<MongoDbContext>();

// Add MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(
    typeof(HRService.Application.Commands.GenerateSalarySlipCommand).Assembly));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://basratechai.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapControllers();

// Run database migrations for PostgreSQL
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<HRDbContext>();
    db.Database.Migrate();
}

app.Run();
