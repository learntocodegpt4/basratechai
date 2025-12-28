# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["HRService.sln", "./"]
COPY ["src/HRService.API/HRService.API.csproj", "src/HRService.API/"]
COPY ["src/HRService.Application/HRService.Application.csproj", "src/HRService.Application/"]
COPY ["src/HRService.Domain/HRService.Domain.csproj", "src/HRService.Domain/"]
COPY ["src/HRService.Infrastructure/HRService.Infrastructure.csproj", "src/HRService.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "HRService.sln"

# Copy all source code
COPY . .

# Build and publish
WORKDIR "/src/src/HRService.API"
RUN dotnet publish "HRService.API.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5002
ENV ASPNETCORE_URLS=http://+:5002

ENTRYPOINT ["dotnet", "HRService.API.dll"]
