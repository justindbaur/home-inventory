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
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemInstance> ItemInstances { get; set; }
        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public DbSet<UnitOfMeasureConversion> UnitOfMeasureConversions { get; set; }
#nullable enable

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Item>();

            builder.Entity<UnitOfMeasure>()
                .HasData(
                    UnitOfMeasure.DefaultItems
                );
        }
    }
}