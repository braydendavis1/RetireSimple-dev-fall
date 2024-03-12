using Microsoft.AspNetCore.Mvc;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

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
		 await newEngineMain.HandleGetInvestmentVehicles();

	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<InvestmentVehicleInfoModel> Get(string id) {
		return await newEngineMain.HandleGetInvestmentVehicle(id);
	}

	[EnableCors]
	[HttpGet]
	[Route("PortfolioProjection/{years}")]
	public async Task<ProjectionInfoModel> GetPortfolioProjection(int years) {
		await newEngineMain.HandleLoadPortfolio();
		return await newEngineMain.HandleGetPorfolioProjection();
	}

	[EnableCors]
	[HttpGet]
	[Route("Projection/{id}/{years}")]
	public async Task<ProjectionInfoModel> GetVehicleProjection(string id, int years) {
		await newEngineMain.HandleLoadPortfolio();
		return await newEngineMain.HandleGetVehicleProjection(id);
	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentVehicleInfoModel vehicle, string Type) {

		await newEngineMain.HandleCreateInvestmentVehicle(vehicle, Type);

	

		return CreatedAtAction(nameof(Get), new { id = vehicle.Id }, vehicle);
	}



	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentVehicleInfoModel vehicle) {
		//var Users = await _UserService.GetAsync(id);

		await newEngineMain.HandleUpdateInvestmentVehicle(id, vehicle);


		return NoContent();
	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {
		await newEngineMain.HandleDeleteInvestmentVehicle(id);
		return NoContent();
	}

	

	
}