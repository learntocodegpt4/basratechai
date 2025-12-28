# BasraTech AI User Service

This microservice handles user authentication, authorization, and user management.

## Architecture

- **Pattern**: CQRS (Command Query Responsibility Segregation)
- **Database**: PostgreSQL
- **Authentication**: JWT with MFA support
- **OAuth**: Google and Microsoft integration

## Structure

```
UserService/
├── src/
│   ├── UserService.API/           # API Layer
│   ├── UserService.Application/   # CQRS Commands & Queries
│   ├── UserService.Domain/        # Domain Models
│   └── UserService.Infrastructure/# Database & External Services
├── tests/
└── Dockerfile
```

## Setup

### Prerequisites
- .NET 8.0 SDK
- PostgreSQL
- Docker (optional)

### Database Connection
Update connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=basratech_users;Username=postgres;Password=your_password"
  }
}
```

### Run Locally
```bash
cd src/UserService.API
dotnet restore
dotnet run
```

### Docker Build
```bash
docker build -t basratech-userservice:latest .
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/mfa/enable` - Enable MFA
- `POST /api/auth/mfa/verify` - Verify MFA code
- `POST /api/auth/oauth/google` - Google OAuth
- `POST /api/auth/oauth/microsoft` - Microsoft OAuth
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users` - List all users (admin only)

## Environment Variables

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=basratech_users
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=3600
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

## Development

To create the .NET project structure:

```bash
# Create solution
dotnet new sln -n UserService

# Create projects
dotnet new webapi -n UserService.API
dotnet new classlib -n UserService.Application
dotnet new classlib -n UserService.Domain
dotnet new classlib -n UserService.Infrastructure
dotnet new xunit -n UserService.Tests

# Add projects to solution
dotnet sln add src/UserService.API/UserService.API.csproj
dotnet sln add src/UserService.Application/UserService.Application.csproj
dotnet sln add src/UserService.Domain/UserService.Domain.csproj
dotnet sln add src/UserService.Infrastructure/UserService.Infrastructure.csproj
dotnet sln add tests/UserService.Tests/UserService.Tests.csproj

# Add project references
cd src/UserService.API
dotnet add reference ../UserService.Application/UserService.Application.csproj
dotnet add reference ../UserService.Infrastructure/UserService.Infrastructure.csproj

cd ../UserService.Application
dotnet add reference ../UserService.Domain/UserService.Domain.csproj

cd ../UserService.Infrastructure
dotnet add reference ../UserService.Domain/UserService.Domain.csproj

# Install packages
cd ../UserService.API
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package MediatR
dotnet add package FluentValidation
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Authentication.Google
dotnet add package Microsoft.AspNetCore.Authentication.MicrosoftAccount
```
