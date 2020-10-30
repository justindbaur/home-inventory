using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeInventory.Shared.Entities
{
    public class PartTran : BaseEntity
    {
        [Key]
        public Guid TranId { get; set; }

        [MaxLength(50)]
        [ForeignKey(nameof(Part))]
        public string PartId { get; set; }

        public Part Part { get; set; }

        public DateTime TranDate { get; set; }

        [MaxLength(20)]
        [ForeignKey(nameof(EntryUser))]
        public string EntryUserName { get; set; }

        public User EntryUser { get; set; }


        public decimal Adjustment { get; set; }
    }
}