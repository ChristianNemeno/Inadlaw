using Inadlaw.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inadlaw.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private static List<TodoItem> todoItems = new List<TodoItem>();

        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetAll()
        {
            return Ok(todoItems);
        }


        [HttpPost]
        public ActionResult<TodoItem> Add(TodoItem todo)
        {
            todo.Id = nextId++;
            todoItems.Add(todo);
            return CreatedAtAction(nameof(GetAll), new {id = todo.Id}, todo);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, TodoItem updated)
        {
            var todo = todoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null) return NotFound();

            todo.Title = updated.Title;
            todo.IsCompleted = updated.IsCompleted;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var todo = todoItems.FirstOrDefault(t => t.Id == id);
            if(todo == null) return NotFound();
            
            todoItems.Remove(todo);

            return NoContent();
        }



    }
}
