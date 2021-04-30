using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using HomeInventory.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using HomeInventory.Shared.Entities;
using HomeInventory.Shared.Dtos;

namespace HomeInventory.Controllers
{
    [ApiController]
    [Route("api/PartSvc")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme + "," + JwtBearerDefaults.AuthenticationScheme)]
    public class PartController : ControllerBase
    {
        private readonly MainDbContext db;

        public PartController(MainDbContext db)
        {
            this.db = db;
        }


        [HttpGet("Parts")]
        public async Task<IActionResult> GetParts()
        {
            var parts = await db.Parts.AsNoTracking().ToListAsync();
            return Ok(parts);
        }

        [HttpGet("Parts/{id}")]
        public async Task<IActionResult> GetPart(string id)
        {
            var part = await db.Parts.FindAsync(id);

            if (part == null)
            {
                return NotFound();
            }

            return Ok(part);
        }

        [HttpPost("Parts")]
        public async Task<IActionResult> CreatePart(CreatePartDto createPart)
        {
            var part = new Part
            {
                Id = createPart.Id,
                Description = createPart.Description
            };

            var addresult = await db.Parts.AddAsync(part);

            if (addresult.State != EntityState.Added)
            {
                return BadRequest();
            }

            await db.SaveChangesAsync();

            var createdPart = await db.Parts.FindAsync(part.Id);

            return Created($"api/PartSvc/Parts/{part.Id})", createdPart);
        }

        [HttpPatch("Parts/{id}")]
        public async Task<IActionResult> UpdatePart(string id, EditPartDto editPart)
        {
            var existingPart = await db.Parts.FindAsync(id);

            if (existingPart == null)
            {
                return NotFound(new { Message = $"Part could not be found by id: {id}" });
            }

            existingPart.Description = editPart.Description;
            existingPart.TypeCode = editPart.TypeCode;
            existingPart.IsActive = editPart.IsActive;
            
            db.Parts.Update(existingPart);
            await db.SaveChangesAsync();

            return Ok(existingPart);
        }

        [HttpDelete("Parts/{id})")]
        public async Task<IActionResult> DeletePart(string id)
        {
            var existingPart = await db.Parts.FindAsync(id);

            if (existingPart == null)
            {
                return NotFound();
            }

            db.Parts.Remove(existingPart);
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PartTrans")]
        public async Task<IActionResult> GetPartTrans()
        {
            var partTrans = await db.PartTrans.AsNoTracking().ToListAsync();
            return Ok(partTrans);
        }

        [HttpGet("PartTrans/{id}")]
        public async Task<IActionResult> GetPartTran(Guid id)
        {
            var partTran = await db.PartTrans.FindAsync(id);

            if (partTran == null)
            {
                return NotFound();
            }

            return Ok(partTran);
        }

        [HttpPatch("PartTrans/{id}")]
        public async Task<IActionResult> UpdatePartTran(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}