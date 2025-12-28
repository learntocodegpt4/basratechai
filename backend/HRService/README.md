# BasraTech AI HR Service

This microservice handles HR management including salary slip generation and employee management.

## Architecture

- **Pattern**: CQRS (Command Query Responsibility Segregation)
- **Database**: PostgreSQL
- **Message Bus**: RabbitMQ
- **PDF Generation**: QuestPDF or DinkToPdf

## Structure

```
HRService/
├── src/
│   ├── HRService.API/              # API Layer
│   ├── HRService.Application/      # CQRS Commands & Queries
│   ├── HRService.Domain/           # Domain Models
│   └── HRService.Infrastructure/   # Database & External Services
├── tests/
└── Dockerfile
```

## Features

- Employee Management
- Salary Slip Generation (PDF)
- Payroll Management
- Leave Management
- Admin-only access control

## Setup

### Prerequisites
- .NET 8.0 SDK
- PostgreSQL
- RabbitMQ
- Docker (optional)

### Database Connection
Update connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=basratech_hr;Username=postgres;Password=your_password"
  }
}
```

### Run Locally
```bash
cd src/HRService.API
dotnet restore
dotnet run
```

### Docker Build
```bash
docker build -t basratech-hrservice:latest .
```

## API Endpoints

### Employees
- `POST /api/employees` - Create employee
- `GET /api/employees/{id}` - Get employee by ID
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees` - List all employees (admin only)

### Salary Slips
- `POST /api/salary-slips` - Generate salary slip
- `GET /api/salary-slips/{id}` - Get salary slip by ID
- `GET /api/salary-slips/employee/{employeeId}` - Get employee salary slips
- `GET /api/salary-slips/{id}/pdf` - Download salary slip PDF
- `GET /api/salary-slips` - List all salary slips (admin only)

### Payroll
- `POST /api/payroll/process` - Process monthly payroll
- `GET /api/payroll/report/{month}/{year}` - Get payroll report

## Company Configuration

Company details are configured in `appsettings.json`:

```json
{
  "CompanyDetails": {
    "Name": "BasraTech AI",
    "Address": "Mumbai, India",
    "GSTIN": "27AABCU9603R1ZM",
    "Proprietor": "Amreek Basra",
    "Email": "amreekbasra@basratechai.com",
    "Logo": "path/to/logo.png"
  }
}
```

## Environment Variables

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=basratech_hr
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
```

## Development

To create the .NET project structure:

```bash
# Create solution
dotnet new sln -n HRService

# Create projects
dotnet new webapi -n HRService.API
dotnet new classlib -n HRService.Application
dotnet new classlib -n HRService.Domain
dotnet new classlib -n HRService.Infrastructure
dotnet new xunit -n HRService.Tests

# Add projects to solution
dotnet sln add src/HRService.API/HRService.API.csproj
dotnet sln add src/HRService.Application/HRService.Application.csproj
dotnet sln add src/HRService.Domain/HRService.Domain.csproj
dotnet sln add src/HRService.Infrastructure/HRService.Infrastructure.csproj
dotnet sln add tests/HRService.Tests/HRService.Tests.csproj

# Add project references
cd src/HRService.API
dotnet add reference ../HRService.Application/HRService.Application.csproj
dotnet add reference ../HRService.Infrastructure/HRService.Infrastructure.csproj

cd ../HRService.Application
dotnet add reference ../HRService.Domain/HRService.Domain.csproj

cd ../HRService.Infrastructure
dotnet add reference ../HRService.Domain/HRService.Domain.csproj

# Install packages
cd ../HRService.API
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package MediatR
dotnet add package FluentValidation
dotnet add package QuestPDF
dotnet add package RabbitMQ.Client
```
