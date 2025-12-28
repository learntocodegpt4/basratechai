# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["UserService.sln", "./"]
COPY ["src/UserService.API/UserService.API.csproj", "src/UserService.API/"]
COPY ["src/UserService.Application/UserService.Application.csproj", "src/UserService.Application/"]
COPY ["src/UserService.Domain/UserService.Domain.csproj", "src/UserService.Domain/"]
COPY ["src/UserService.Infrastructure/UserService.Infrastructure.csproj", "src/UserService.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "UserService.sln"

# Copy all source code
COPY . .

# Build and publish
WORKDIR "/src/src/UserService.API"
RUN dotnet publish "UserService.API.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5001
ENV ASPNETCORE_URLS=http://+:5001

ENTRYPOINT ["dotnet", "UserService.API.dll"]
