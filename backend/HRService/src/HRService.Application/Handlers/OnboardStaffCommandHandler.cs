using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class OnboardStaffCommandHandler : IRequestHandler<OnboardStaffCommand, OnboardStaffResult>
{
    private readonly MongoDbContext _mongoContext;

    public OnboardStaffCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<OnboardStaffResult> Handle(OnboardStaffCommand request, CancellationToken cancellationToken)
    {
        try
        {
            // Check if staff with same email already exists
            var existingStaff = await _mongoContext.Staff
                .Find(s => s.Email == request.Email)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingStaff != null)
            {
                return new OnboardStaffResult
                {
                    Success = false,
                    ErrorMessage = "Staff with this email already exists"
                };
            }

            // Create new staff entity
            var staff = new Staff
            {
                Id = Guid.NewGuid(),
                StaffId = request.StaffId,
                UserId = request.UserId,
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Designation = request.Designation,
                Department = request.Department,
                JoiningDate = request.JoiningDate,
                Address = request.Address,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            // Add emergency contact if provided
            if (!string.IsNullOrEmpty(request.EmergencyContactName))
            {
                staff.EmergencyContact = new EmergencyContact
                {
                    Name = request.EmergencyContactName,
                    Relationship = request.EmergencyContactRelationship ?? string.Empty,
                    PhoneNumber = request.EmergencyContactPhone ?? string.Empty
                };
            }

            // Add bank details if provided
            if (!string.IsNullOrEmpty(request.BankName))
            {
                staff.BankDetails = new BankDetails
                {
                    BankName = request.BankName,
                    AccountNumber = request.AccountNumber ?? string.Empty,
                    IfscCode = request.IfscCode ?? string.Empty,
                    AccountHolderName = request.AccountHolderName ?? string.Empty
                };
            }

            await _mongoContext.Staff.InsertOneAsync(staff, cancellationToken: cancellationToken);

            return new OnboardStaffResult
            {
                Success = true,
                StaffId = staff.Id
            };
        }
        catch (Exception ex)
        {
            return new OnboardStaffResult
            {
                Success = false,
                ErrorMessage = $"Error onboarding staff: {ex.Message}"
            };
        }
    }
}
