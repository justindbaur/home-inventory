using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeInventory.Shared.Entities
{
    public class ItemInstance
    {
        public Guid Id { get; set; }
        public Item Item { get; set; }

        [ForeignKey(nameof(Item))]
        public string ItemBarcodeNum { get; set; }
        public double Quantity { get; set; }
        public DateTime? ExpireDate { get; set; }
    }
}