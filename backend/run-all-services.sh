#!/bin/bash

# BasraTech AI - Run All Services
# This script runs all microservices and the API gateway

echo "=========================================="
echo "BasraTech AI - Starting All Services"
echo "=========================================="
echo ""

# Check if .NET 10 SDK is installed
if ! dotnet --version | grep -q "^10\."; then
    echo "Error: .NET 10 SDK is required but not installed."
    echo "Please install .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0"
    exit 1
fi

# Build the entire solution
echo "Building all services..."
cd "$(dirname "$0")"
dotnet build BasraTechAI.sln --configuration Release

if [ $? -ne 0 ]; then
    echo "Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "=========================================="
echo "Starting services..."
echo "=========================================="
echo ""

# Function to kill all background processes on exit
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup INT TERM

# Start API Gateway
echo "Starting API Gateway on port 5000..."
cd ApiGateway/src/ApiGateway
dotnet run --configuration Release --no-build --urls="http://localhost:5000" &
GATEWAY_PID=$!
cd ../../..

# Wait a moment for gateway to start
sleep 2

# Start User Service
echo "Starting User Service on port 5001..."
cd UserService/src/UserService.API
dotnet run --configuration Release --no-build --urls="http://localhost:5001" &
USER_SERVICE_PID=$!
cd ../../..

# Wait a moment for user service to start
sleep 2

# Start HR Service
echo "Starting HR Service on port 5002..."
cd HRService/src/HRService.API
dotnet run --configuration Release --no-build --urls="http://localhost:5002" &
HR_SERVICE_PID=$!
cd ../../..

echo ""
echo "=========================================="
echo "All services started successfully!"
echo "=========================================="
echo ""
echo "API Gateway:    http://localhost:5000"
echo "  Health Check: http://localhost:5000/health"
echo ""
echo "User Service:   http://localhost:5001"
echo "  Swagger UI:   http://localhost:5001/swagger"
echo ""
echo "HR Service:     http://localhost:5002"
echo "  Swagger UI:   http://localhost:5002/swagger"
echo ""
echo "=========================================="
echo "Press Ctrl+C to stop all services"
echo "=========================================="

# Wait for all background processes
wait
