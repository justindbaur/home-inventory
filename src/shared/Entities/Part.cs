using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeInventory.Shared.Entities
{
    public class Part : BaseEntity
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        [MaxLength(2)]
        public string TypeCode { get; set; }

        public bool IsActive { get; set; }

        public ICollection<PartTran> PartTrans { get; set; }
    }
}