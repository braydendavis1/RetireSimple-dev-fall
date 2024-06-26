
using NewBackend.Services;

using RetireSimple.NewEngine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using System.ComponentModel.DataAnnotations;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.Configure<RetireSimpleDatabaseSettings>(
	builder.Configuration.GetSection("RetireSimpleDatabase");

builder.Services.AddSingleton<NewEngineMain>();

builder.Services.AddCors(options => {
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy => {
						  policy
						  .WithOrigins("http://127.0.0.1:3000")
						  .WithOrigins("http://localhost:3000")
						  .WithOrigins("http://localhost:3001")
						  .WithMethods("GET", "POST", "PUT", "DELETE")
						  .AllowAnyHeader();
					  });
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

//app.UseHttpLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);


app.UseAuthorization();

app.MapControllers();

app.Run();
