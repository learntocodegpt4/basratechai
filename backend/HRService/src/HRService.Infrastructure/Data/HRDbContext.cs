using Microsoft.EntityFrameworkCore;
using HRService.Domain.Entities;

namespace HRService.Infrastructure.Data;

public class HRDbContext : DbContext
{
    public HRDbContext(DbContextOptions<HRDbContext> options) : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<SalarySlip> SalarySlips { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.EmployeeId).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Designation).HasMaxLength(100);
            entity.Property(e => e.Department).HasMaxLength(100);
        });

        modelBuilder.Entity<SalarySlip>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Employee)
                .WithMany(e => e.SalarySlips)
                .HasForeignKey(e => e.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
