using Microsoft.AspNetCore.Mvc;
using NewBackend.Services;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using RetireSimple.NewEngine.New_Engine.Users;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

namespace UserstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentVehicleController : ControllerBase {
	private readonly InvestmentVehicleService _UserService;
	private static NewEngineMain newEngineMain;

	public InvestmentVehicleController(InvestmentVehicleService InvestmentVehicleService, UserService UserService) {
		_UserService = InvestmentVehicleService;
		newEngineMain = new NewEngineMain(UserService, InvestmentVehicleService);
	}

	[EnableCors]
	[HttpGet]
	public async Task<InvestmentVehicleInfoModel> Get(string id) =>
		await newEngineMain.DoHandleGetInvestmentVehicle(id);

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentVehicleInfoModel info) {
		await newEngineMain.DoHandleCreateInvestmentVehicle(info);

		return CreatedAtAction(nameof(Get), new { id = info.Id }, info);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentVehicleInfoModel info) {
	
		await newEngineMain.DoHandleCreateInvestmentVehicle(info);

		return NoContent();
	}

	
}