using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeInventory.Shared.Entities
{
    public class Item
    {
        [Key]
        public string BarcodeNum { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }
        public double Quantity { get; set; }

        [MaxLength(50)]
        public string Location { get; set; }

        public double Size { get; set; }

        [ForeignKey(nameof(UOM))]
        public string UOMName { get; set; }
        public UnitOfMeasure UOM { get; set; }

        public ICollection<ItemInstance> Instances { get; set; }
    }
}