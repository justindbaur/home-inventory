using System.ComponentModel.DataAnnotations;

namespace HomeInventory.Shared.Dtos
{
    public class CreatePartDto
    {
        [MaxLength(8)]
        public string Company { get; set; }
        [MaxLength(50)]
        public string Id { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }
    }
}