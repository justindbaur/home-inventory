using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using HomeInventory.Contexts;
using Microsoft.AspNetCore.Mvc;
using HomeInventory.Shared.Entities;
using HomeInventory.Services;
using HomeInventory.Shared.Dtos;
using Microsoft.AspNetCore.Cors;

namespace HomeInventory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class InventoryController : ControllerBase
    {
        private readonly MainDbContext db;
        private readonly IConversionService converter;

        public InventoryController(MainDbContext db, IConversionService converter)
        {
            this.db = db;
            this.converter = converter;
        }

#region Item

        [HttpGet("items")]
        public async Task<IActionResult> GetItems()
        {
            var items = await db.Items.AsNoTracking().ToListAsync();
            return Ok(items);
        }

        [HttpGet("items/{barcodeNum}")]
        public async Task<IActionResult> GetItem(string barcodeNum)
        {
            var item = await db.Items.FindAsync(barcodeNum);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpGet("items/{barcodeNum}/instances")]
        public IActionResult GetItemInstances(string barcodeNum)
        {
            var item = db.Items.Include(i => i.Instances).Where(i => i.BarcodeNum == barcodeNum).FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item.Instances);
        }

        [HttpPost("items")]
        public async Task<IActionResult> CreateItem(CreateItemDto createItem)
        {
            var item = new Item
            {
                BarcodeNum = createItem.BarcodeNum,
                Quantity = 1,
                Name = "",
                UOMName = "Ounce"
            };

            var addresult = await db.Items.AddAsync(item);

            if (addresult.State != EntityState.Added)
            {
                return BadRequest();
            }

            await db.SaveChangesAsync();

            var createdItem = await db.Items.FindAsync(item.BarcodeNum);

            return Created($"api/Inventory/{item.BarcodeNum}", createdItem);
        }

        [HttpPatch("items/{barcodeNum}")]
        public async Task<IActionResult> UpdateItem(string barcodeNum, Item inventoryItem)
        {
            var existingItem = await db.Items.FindAsync(barcodeNum);

            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Name = inventoryItem.Name;
            existingItem.Quantity = inventoryItem.Quantity;
            existingItem.Location = inventoryItem.Location;

            db.Items.Update(existingItem);
            await db.SaveChangesAsync();

            return Ok(existingItem);
        }

        [HttpDelete("items/{barcodeNum}")]
        public async Task<IActionResult> DeleteItem(string barcodeNum)
        {
            var existingItem = await db.Items.FindAsync(barcodeNum);

            if (existingItem == null)
            {
                return NotFound();
            }

            db.Items.Remove(existingItem);
            await db.SaveChangesAsync();
            return NoContent();
        }
#endregion

#region UOM
        [HttpGet("uoms")]
        public IActionResult GetUOMs()
        {
            return Ok(db.UnitOfMeasures.ToList());
        }
        
        [HttpGet("uoms/{name}")]
        public IActionResult GetUOM(string name)
        {
            var uom = db.UnitOfMeasures.Find(name);

            if (uom == null)
            {
                return NotFound();
            }

            return Ok(uom);
        }
#endregion
    }
}