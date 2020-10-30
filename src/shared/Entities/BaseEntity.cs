using System;
using System.ComponentModel.DataAnnotations;

namespace HomeInventory.Shared.Entities
{
    public class BaseEntity
    {
        [Key]
        public string Company { get; set; }
    }
}