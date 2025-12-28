# BasraTech AI Backend - .NET 10 Microservices

Complete microservices architecture with Clean Architecture, CQRS pattern, and YARP API Gateway.

## 🚀 Quick Start - Run Everything with One Command

### Option 1: Using Shell Script (Linux/macOS)
```bash
cd backend
./run-all-services.sh
```

### Option 2: Using PowerShell (Windows)
```powershell
cd backend
.\run-all-services.ps1
```

### Option 3: Using Docker Compose (All Platforms)
```bash
docker-compose up
```

That's it! All services (API Gateway, User Service, HR Service) will start automatically.

## 📋 Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) (Latest stable version)
- PostgreSQL (or use Docker Compose)
- Docker and Docker Compose (optional, for containerized deployment)

## 🏗️ Architecture

```
backend/
├── BasraTechAI.sln              # Master solution containing all projects
├── run-all-services.sh          # Shell script to run all services
├── run-all-services.ps1         # PowerShell script to run all services
├── ApiGateway/                  # YARP API Gateway (Port 5000)
│   ├── Dockerfile
│   └── src/ApiGateway/
├── UserService/                 # User & Authentication Service (Port 5001)
│   ├── UserService.sln
│   ├── Dockerfile
│   └── src/
│       ├── UserService.API/
│       ├── UserService.Application/
│       ├── UserService.Domain/
│       └── UserService.Infrastructure/
└── HRService/                   # HR & Salary Management Service (Port 5002)
    ├── HRService.sln
    ├── Dockerfile
    └── src/
        ├── HRService.API/
        ├── HRService.Application/
        ├── HRService.Domain/
        └── HRService.Infrastructure/
```

## 🔧 Building the Solution

Build all services at once:
```bash
cd backend
dotnet build BasraTechAI.sln
```

Build in Release mode:
```bash
dotnet build BasraTechAI.sln --configuration Release
```

## 🏃 Running Services Individually

### API Gateway (Port 5000)
```bash
cd backend/ApiGateway/src/ApiGateway
dotnet run --urls="http://localhost:5000"
```

### User Service (Port 5001)
```bash
cd backend/UserService/src/UserService.API
dotnet run --urls="http://localhost:5001"
```

### HR Service (Port 5002)
```bash
cd backend/HRService/src/HRService.API
dotnet run --urls="http://localhost:5002"
```

## 🌐 Service Endpoints

### API Gateway (http://localhost:5000)
- **Health Check**: `GET /health`
- Routes all requests to appropriate services:
  - `/api/auth/*` → User Service
  - `/api/users/*` → User Service
  - `/api/employees/*` → HR Service
  - `/api/salary-slips/*` → HR Service
  - `/api/payroll/*` → HR Service

### User Service (http://localhost:5001)
- **Swagger UI**: http://localhost:5001/swagger
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### HR Service (http://localhost:5002)
- **Swagger UI**: http://localhost:5002/swagger
- **Generate Salary Slip**: `POST /api/salary-slips`

## 🐳 Docker Deployment

### Build Images
```bash
# From backend directory
docker build -t basratech-apigateway:latest -f ApiGateway/Dockerfile .
docker build -t basratech-userservice:latest -f UserService/Dockerfile .
docker build -t basratech-hrservice:latest -f HRService/Dockerfile .
```

### Run with Docker Compose
The `docker-compose.yml` in the root directory includes:
- PostgreSQL (2 instances for User & HR services)
- MongoDB
- RabbitMQ
- All 3 microservices
- Frontend

```bash
# From repository root
docker-compose up -d
```

## 🔑 Environment Variables

Create a `.env` file or set these environment variables:

```bash
# Database
POSTGRES_PASSWORD=postgres123

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=3600
JWT_ISSUER=BasraTechAI
JWT_AUDIENCE=BasraTechAI

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Company Details
COMPANY_NAME=BasraTech AI
COMPANY_ADDRESS=Mumbai, India
COMPANY_GSTIN=27AABCU9603R1ZM
COMPANY_PROPRIETOR=Amreek Basra
COMPANY_EMAIL=amreekbasra@basratechai.com
```

## 📊 Technology Stack

- **.NET 10** - Latest stable version
- **C# 13** - Latest language features
- **Entity Framework Core 10.0** - ORM
- **PostgreSQL** - Primary database
- **MediatR** - CQRS implementation
- **YARP** - API Gateway
- **BCrypt** - Password hashing
- **JWT** - Authentication tokens
- **Swagger/OpenAPI** - API documentation

## 🧪 Testing

Run all tests:
```bash
cd backend
dotnet test BasraTechAI.sln
```

## 📝 Database Migrations

Migrations are automatically applied on service startup. To create new migrations:

### User Service
```bash
cd backend/UserService/src/UserService.API
dotnet ef migrations add MigrationName --project ../UserService.Infrastructure/UserService.Infrastructure.csproj
```

### HR Service
```bash
cd backend/HRService/src/HRService.API
dotnet ef migrations add MigrationName --project ../HRService.Infrastructure/HRService.Infrastructure.csproj
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **BCrypt Password Hashing**: Industry-standard password security
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data externalized
- **HTTPS Support**: Ready for production deployment

## 📚 API Documentation

Once services are running, access interactive API documentation:

- User Service Swagger: http://localhost:5001/swagger
- HR Service Swagger: http://localhost:5002/swagger

## 🐛 Troubleshooting

### Port Already in Use
If you get "port already in use" errors, either:
1. Kill the process using that port
2. Change the port in the run script or use `--urls` parameter

### Database Connection Issues
Ensure PostgreSQL is running:
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Start PostgreSQL with Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 postgres:16-alpine
```

### Build Errors
Clean and rebuild:
```bash
cd backend
dotnet clean BasraTechAI.sln
dotnet build BasraTechAI.sln
```

## 📖 Additional Documentation

- [User Service README](UserService/README.md)
- [HR Service README](HRService/README.md)
- [API Gateway README](ApiGateway/README.md)
- [Microservices Implementation Guide](MICROSERVICES_IMPLEMENTATION.md)

## 🤝 Contributing

1. All services use Clean Architecture
2. Follow CQRS pattern for commands and queries
3. Use MediatR for command/query handling
4. Write unit tests for business logic
5. Update migrations after domain changes

## 📞 Support

For issues or questions:
- Email: amreekbasra@basratechai.com
- Location: Mumbai, India

---

**Built with .NET 10** 🚀
