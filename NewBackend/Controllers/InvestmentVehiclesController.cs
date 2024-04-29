using Microsoft.AspNetCore.Mvc;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.GrowthModels._401kGrowthModels;

namespace UserstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentVehiclesController : ControllerBase {
	//private readonly UserService _UserService;
	private readonly NewEngineMain newEngineMain;

	private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

	public InvestmentVehiclesController(NewEngineMain newEngineMain) {
		
		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<InvestmentVehicleInfoModel>> Get() {

		logger.Info("GET Investment Vehicles");

		try {
			return await newEngineMain.HandleGetInvestmentVehicles();
		}catch(Exception e) {
			logger.Error("Error: {0}", e.Message);
			return null;
		}
		
	}


	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<InvestmentVehicleInfoModel> Get(string id) {

		logger.Info("GET Investment Vehicle {0}", id);

		try {
			return await newEngineMain.HandleGetInvestmentVehicle(id);
		}
		catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}
	
	}

	[EnableCors]
	[HttpGet]
	[Route("PortfolioProjection/{years}")]
	public async Task<ProjectionInfoModel> GetPortfolioProjection(int years) {

		logger.Info("GET Portfolio Projection");

		try {
			await newEngineMain.HandleLoadPortfolio();
			//removed years 
			return await newEngineMain.HandleGetPorfolioProjection();
		}catch (Exception e) {
			BadRequest("Error: "+ e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}

	}

	[EnableCors]
	[HttpGet]
	[Route("Projection/{id}/{years}")]
	public async Task<ProjectionInfoModel> GetVehicleProjection(string id, int years) {

		logger.Info("GET Projection {0}", id);

		try {
			await newEngineMain.HandleLoadPortfolio();
			return await newEngineMain.HandleGetVehicleProjection(id);
		}catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}

	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentVehicleInfoModel vehicle, string Type) {

		logger.Info("POST Investment Vehicle {0}", vehicle.Id);

		_401kGrowth growth = new _401kGrowth();
		Projection projection = growth.GenerateProjection(vehicle.Value, 30, vehicle, new List<RetireSimple.NewEngine.New_Engine.Financials.Expenses.Expense>());
		vehicle.Projection = Math.Round(projection.yearly_projections[29], 2);
		vehicle.ExpenseIds = new List<string>();

		try {
			await newEngineMain.HandleCreateInvestmentVehicle(vehicle, Type);
			return CreatedAtAction(nameof(Get), new { id = vehicle.Id }, vehicle);
		}catch(Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: "+ e.Message);
		}

	}



	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentVehicleInfoModel vehicle) {

		logger.Info("PUT Investment Vehicle {0}", id);

		try {
			await newEngineMain.HandleUpdateInvestmentVehicle(id, vehicle);


			return NoContent();
		}catch(Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}


	}

	[HttpPut]
	[Route("AddExpenseInvestmentVehicle")]
	public async Task<IActionResult> AddExpenseToInvestmentVehicle(string id, string expenseId) {
		await newEngineMain.HandleLoadPortfolio();
		await newEngineMain.HandleAddExpenseToInvestmentVehicle(id, expenseId);
		return NoContent();
	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {

		logger.Info("DELETE Investment Vehicle {0}", id);

		try {
			await newEngineMain.HandleDeleteInvestmentVehicle(id);
			return NoContent();
		}
		catch(Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}

	}

	

	
}