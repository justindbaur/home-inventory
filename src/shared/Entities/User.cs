using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HomeInventory.Shared.Entities
{
    public class User : BaseEntity
    {
        [Key]
        [MaxLength(20)]
        public string UserName { get; set; }

        public ICollection<PartTran> PartTrans { get; set; }
    }
}