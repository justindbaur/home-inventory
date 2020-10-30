using System;
using HomeInventory.Shared.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeInventory.Contexts
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
            
        }

#nullable disable
        public DbSet<Part> Parts { get; set; }
        public DbSet<PartTran> PartTrans { get; set; }
        public DbSet<User> Users { get; set; }
#nullable enable

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Part>()
                .HasKey(p => new { p.Company, p.Id });

            builder.Entity<PartTran>()
                .HasKey(p => new { p.Company, p.TranId });

            builder.Entity<PartTran>()
                .HasOne(p => p.Part)
                .WithMany(p => p.PartTrans)
                .HasForeignKey(p => new { p.Company, p.PartId });

            builder.Entity<PartTran>()
                .HasOne(p => p.EntryUser)
                .WithMany(u => u.PartTrans)
                .HasForeignKey(p => new { p.Company, p.EntryUserName });

            var userEntityBuilder = builder.Entity<User>();
            userEntityBuilder.HasKey(u => new { u.Company, u.UserName });
            userEntityBuilder.HasData(new[] 
            {
                new User { Company = "HOME", UserName = "jdbaur" }
            });
        }
    }
}