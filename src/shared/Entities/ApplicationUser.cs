using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HomeInventory.Shared.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<PartTran> PartTrans { get; set; }
    }
}