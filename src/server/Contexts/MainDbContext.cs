using System;
using HomeInventory.Shared.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace HomeInventory.Contexts
{
    public class MainDbContext : IdentityDbContext<ApplicationUser>
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
            
        }

#nullable disable
        public DbSet<Part> Parts { get; set; }
        public DbSet<PartTran> PartTrans { get; set; }
#nullable enable

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Part>();

            builder.Entity<PartTran>();

            builder.Entity<PartTran>()
                .HasOne(p => p.Part)
                .WithMany(p => p.PartTrans);

            builder.Entity<PartTran>()
                .HasOne(p => p.EntryUser)
                .WithMany(u => u.PartTrans);

            builder.Entity<ApplicationUser>(b => 
            {
                b.HasData(new[]
                {
                    new ApplicationUser
                    {
                        UserName = "jdbaur",
                        NormalizedUserName = "JDBAUR",
                        Email = "me@justinbaur.com",
                        NormalizedEmail = "ME@JUSTINBAUR.COM",
                        PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(null!, "jdbaur"),
                    }
                });
            });
        }
    }
}