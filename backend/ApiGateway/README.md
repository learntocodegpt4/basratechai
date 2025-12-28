# BasraTech AI API Gateway

This is the API Gateway for BasraTech AI microservices, built using YARP (Yet Another Reverse Proxy).

## Architecture

- **Technology**: YARP (Microsoft's Reverse Proxy)
- **Load Balancing**: Round Robin
- **Features**:
  - Request routing
  - Authentication & Authorization
  - Rate limiting
  - CORS handling
  - Request/Response transformation

## Structure

```
ApiGateway/
├── src/
│   └── ApiGateway/
│       ├── Program.cs
│       ├── appsettings.json
│       └── ApiGateway.csproj
└── Dockerfile
```

## Routes Configuration

### User Service Routes
- `/api/auth/*` → `http://user-service:5001/api/auth/*`
- `/api/users/*` → `http://user-service:5001/api/users/*`

### HR Service Routes
- `/api/employees/*` → `http://hr-service:5002/api/employees/*`
- `/api/salary-slips/*` → `http://hr-service:5002/api/salary-slips/*`
- `/api/payroll/*` → `http://hr-service:5002/api/payroll/*`

## Setup

### Prerequisites
- .NET 8.0 SDK
- Docker (optional)

### Configuration

The gateway configuration is in `appsettings.json`:

```json
{
  "ReverseProxy": {
    "Routes": {
      "user-service-route": {
        "ClusterId": "user-service",
        "Match": {
          "Path": "/api/auth/{**catch-all}"
        }
      },
      "hr-service-route": {
        "ClusterId": "hr-service",
        "Match": {
          "Path": "/api/salary-slips/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "user-service": {
        "Destinations": {
          "user-service-1": {
            "Address": "http://user-service:5001"
          }
        }
      },
      "hr-service": {
        "Destinations": {
          "hr-service-1": {
            "Address": "http://hr-service:5002"
          }
        }
      }
    }
  }
}
```

### Run Locally

```bash
cd src/ApiGateway
dotnet restore
dotnet run
```

### Docker Build

```bash
docker build -t basratech-apigateway:latest .
```

## Development

To create the .NET project:

```bash
# Create project
dotnet new web -n ApiGateway

# Install YARP
cd src/ApiGateway
dotnet add package Yarp.ReverseProxy

# Install additional packages
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.RateLimiting
```

## Environment Variables

```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:5000
USER_SERVICE_URL=http://user-service:5001
HR_SERVICE_URL=http://hr-service:5002
JWT_SECRET=your_jwt_secret
```

## Features

### Authentication
All requests are validated for JWT tokens except public endpoints:
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/oauth/*`

### Rate Limiting
- Public endpoints: 10 requests per minute
- Authenticated endpoints: 100 requests per minute
- Admin endpoints: 1000 requests per minute

### CORS
Configured to allow requests from:
- `http://localhost:3000` (development)
- `https://basratechai.com` (production)

### Health Checks
- Gateway health: `GET /health`
- User service health: `GET /health/user-service`
- HR service health: `GET /health/hr-service`

## Monitoring

The gateway logs all requests and provides metrics for:
- Request count
- Response times
- Error rates
- Service health status
