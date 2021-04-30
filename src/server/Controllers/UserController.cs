using System;
using System.Threading.Tasks;
using HomeInventory.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeInventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]Svc")]
    public class UserController : ControllerBase
    {
        private readonly MainDbContext db;

        public UserController(MainDbContext db)
        {
            this.db = db;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await db.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("users/({company}, {id})")]
        public async Task<IActionResult> GetUser(string company, string id)
        {
            var user = await db.Users.FindAsync(company, id);
            return Ok(user);
        }
    }
}
