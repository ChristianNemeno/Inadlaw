using Microsoft.EntityFrameworkCore;

using Inadlaw.Models;

namespace Inadlaw.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> Todos => Set<TodoItem>();
    }

}
