using System.ComponentModel.DataAnnotations;

namespace HomeInventory.Shared.Dtos
{
    public class EditPartDto
    {
        [MaxLength(255)]
        public string Description { get; set; }

        [MaxLength(2)]
        public string TypeCode { get; set; }
        public bool IsActive { get; set; }
    }
}