using Inadlaw.Data;
using Inadlaw.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Inadlaw.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _db;
        private readonly ILogger<TodoController> _logger;

        public TodoController(TodoContext db, ILogger<TodoController> logger)
        {
            _db = db;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
        {
            _logger.LogInformation("GetAll called");
            var items = await _db.Todos.ToListAsync();
            return Ok(items);
        }


        [HttpPost]
        public async Task<ActionResult<TodoItem>> Add(TodoItem todo)
        {
            _logger.LogInformation("Add called: {Title}", todo?.Title);

            _db.Todos.Add(todo);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, TodoItem updated)
        {
            _logger.LogInformation("Update called for id={Id}", id);

            var todo = await _db.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            todo.Title = updated.Title;
            todo.IsCompleted = updated.IsCompleted;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {

            _logger.LogInformation("Delete called for id={Id}", id);

            var todo = await _db.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            _db.Todos.Remove(todo);
            await _db.SaveChangesAsync();

            return NoContent();
        }



    }
}
