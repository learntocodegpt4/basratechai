using MediatR;
using MongoDB.Driver;
using HRService.Application.Commands;
using HRService.Domain.Entities;
using HRService.Infrastructure.Data;

namespace HRService.Application.Handlers;

public class UpdateStaffCommandHandler : IRequestHandler<UpdateStaffCommand, UpdateStaffResult>
{
    private readonly MongoDbContext _mongoContext;

    public UpdateStaffCommandHandler(MongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
    }

    public async Task<UpdateStaffResult> Handle(UpdateStaffCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var filter = Builders<Staff>.Filter.Eq(s => s.Id, request.StaffId);
            var updateDefinition = Builders<Staff>.Update.Set(s => s.UpdatedAt, DateTime.UtcNow);

            // Update fields if provided
            if (!string.IsNullOrEmpty(request.Name))
                updateDefinition = updateDefinition.Set(s => s.Name, request.Name);
            
            if (request.PhoneNumber != null)
                updateDefinition = updateDefinition.Set(s => s.PhoneNumber, request.PhoneNumber);
            
            if (!string.IsNullOrEmpty(request.Designation))
                updateDefinition = updateDefinition.Set(s => s.Designation, request.Designation);
            
            if (!string.IsNullOrEmpty(request.Department))
                updateDefinition = updateDefinition.Set(s => s.Department, request.Department);
            
            if (request.Address != null)
                updateDefinition = updateDefinition.Set(s => s.Address, request.Address);
            
            if (request.IsActive.HasValue)
                updateDefinition = updateDefinition.Set(s => s.IsActive, request.IsActive.Value);

            // Update emergency contact if provided
            if (!string.IsNullOrEmpty(request.EmergencyContactName))
            {
                var emergencyContact = new EmergencyContact
                {
                    Name = request.EmergencyContactName,
                    Relationship = request.EmergencyContactRelationship ?? string.Empty,
                    PhoneNumber = request.EmergencyContactPhone ?? string.Empty
                };
                updateDefinition = updateDefinition.Set(s => s.EmergencyContact, emergencyContact);
            }

            // Update bank details if provided
            if (!string.IsNullOrEmpty(request.BankName))
            {
                var bankDetails = new BankDetails
                {
                    BankName = request.BankName,
                    AccountNumber = request.AccountNumber ?? string.Empty,
                    IfscCode = request.IfscCode ?? string.Empty,
                    AccountHolderName = request.AccountHolderName ?? string.Empty
                };
                updateDefinition = updateDefinition.Set(s => s.BankDetails, bankDetails);
            }

            var result = await _mongoContext.Staff.UpdateOneAsync(filter, updateDefinition, cancellationToken: cancellationToken);

            if (result.MatchedCount == 0)
            {
                return new UpdateStaffResult
                {
                    Success = false,
                    ErrorMessage = "Staff not found"
                };
            }

            return new UpdateStaffResult
            {
                Success = true
            };
        }
        catch (Exception ex)
        {
            return new UpdateStaffResult
            {
                Success = false,
                ErrorMessage = $"Error updating staff: {ex.Message}"
            };
        }
    }
}
