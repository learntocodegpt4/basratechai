# BasraTech AI - Run All Services (PowerShell)
# This script runs all microservices and the API gateway

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "BasraTech AI - Starting All Services" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .NET 10 SDK is installed
$dotnetVersion = dotnet --version
if (-not ($dotnetVersion -match "^10\.")) {
    Write-Host "Error: .NET 10 SDK is required but not installed." -ForegroundColor Red
    Write-Host "Please install .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0" -ForegroundColor Red
    exit 1
}

# Build the entire solution
Write-Host "Building all services..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
dotnet build BasraTechAI.sln --configuration Release

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Starting services..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Start API Gateway
Write-Host "Starting API Gateway on port 5000..." -ForegroundColor Green
$gatewayJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    Set-Location ApiGateway/src/ApiGateway
    dotnet run --configuration Release --no-build --urls="http://localhost:5000"
}

Start-Sleep -Seconds 2

# Start User Service
Write-Host "Starting User Service on port 5001..." -ForegroundColor Green
$userServiceJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    Set-Location UserService/src/UserService.API
    dotnet run --configuration Release --no-build --urls="http://localhost:5001"
}

Start-Sleep -Seconds 2

# Start HR Service
Write-Host "Starting HR Service on port 5002..." -ForegroundColor Green
$hrServiceJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    Set-Location HRService/src/HRService.API
    dotnet run --configuration Release --no-build --urls="http://localhost:5002"
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "All services started successfully!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "API Gateway:    http://localhost:5000" -ForegroundColor Yellow
Write-Host "  Health Check: http://localhost:5000/health" -ForegroundColor Gray
Write-Host ""
Write-Host "User Service:   http://localhost:5001" -ForegroundColor Yellow
Write-Host "  Swagger UI:   http://localhost:5001/swagger" -ForegroundColor Gray
Write-Host ""
Write-Host "HR Service:     http://localhost:5002" -ForegroundColor Yellow
Write-Host "  Swagger UI:   http://localhost:5002/swagger" -ForegroundColor Gray
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

# Wait for user to press Ctrl+C
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if any job has failed
        if ($gatewayJob.State -eq "Failed" -or $userServiceJob.State -eq "Failed" -or $hrServiceJob.State -eq "Failed") {
            Write-Host ""
            Write-Host "One or more services failed. Stopping all services..." -ForegroundColor Red
            break
        }
    }
}
finally {
    Write-Host ""
    Write-Host "Stopping all services..." -ForegroundColor Yellow
    Stop-Job $gatewayJob, $userServiceJob, $hrServiceJob -ErrorAction SilentlyContinue
    Remove-Job $gatewayJob, $userServiceJob, $hrServiceJob -ErrorAction SilentlyContinue
    Write-Host "All services stopped." -ForegroundColor Green
}
