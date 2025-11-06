using Microsoft.EntityFrameworkCore;
using Inadlaw.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            policy => policy.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());  
    });

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply pending migrations at startup (development convenience)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
    db.Database.Migrate();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

// Request/response logging middleware
app.Use(async (context, next) =>
{
    var logger = app.Logger;
    logger.LogInformation("Incoming {Method} {Path}{QueryString} from {RemoteIp}",
        context.Request.Method,
        context.Request.Path,
        context.Request.QueryString,
        context.Connection.RemoteIpAddress);

    await next(); // invoke the next middleware / controller

    logger.LogInformation("Handled {Method} {Path} => {StatusCode}",
        context.Request.Method,
        context.Request.Path,
        context.Response.StatusCode);
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
