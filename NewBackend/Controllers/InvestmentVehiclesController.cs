using Microsoft.AspNetCore.Mvc;
using NewBackend.Services;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using RetireSimple.NewEngine.New_Engine.Users;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

namespace UserstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentVehiclesController : ControllerBase {
	//private readonly UserService _UserService;
	private readonly NewEngineMain newEngineMain;

	public InvestmentVehiclesController(NewEngineMain newEngineMain) {
		
		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<InvestmentVehicleInfoModel>> Get() =>
		 await newEngineMain.HandleGetInvestmentVehciles();

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentVehicleInfoModel vehicle, string Type) {
		//await _UserService.CreateAsync(newUsers);

		await newEngineMain.HandleCreateInvestmentVehicle(vehicle, Type);

	

		return CreatedAtAction(nameof(Get), new { id = vehicle.Id }, vehicle);
	}


	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentVehicleInfoModel vehicle) {
		//var Users = await _UserService.GetAsync(id);

		await newEngineMain.HandleUpdateInvestmentVehicle(id, vehicle);


		return NoContent();
	}

	
}