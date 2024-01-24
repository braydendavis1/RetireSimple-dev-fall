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
	private readonly UserService _UserService;
	private static NewEngineMain newEngineMain;

	public InvestmentVehicleController(UserService UserService) {
		_UserService = UserService;
		newEngineMain = new NewEngineMain(UserService);
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<InvestmentVehicleInfoModel>> Get() =>
		await newEngineMain.HandleReadInvestmentVehicles();

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(UserInfoModel newUsers) {
		await newEngineMain.HandleCreateUser(newUsers);

		return CreatedAtAction(nameof(Get), new { id = newUsers.Id }, newUsers);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, UserInfoModel updatedUsers) {
		var Users = await _UserService.GetAsync(id);

		if (Users is null) {
			return NotFound();
		}

		updatedUsers.Id = Users.Id;

		await newEngineMain.HandleUpdateUser(updatedUsers);

		return NoContent();
	}

	
}