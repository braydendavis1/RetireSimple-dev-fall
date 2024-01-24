using Microsoft.AspNetCore.Mvc;
using NewBackend.Services;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using RetireSimple.NewEngine.New_Engine.Users;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;

namespace UserstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
	private readonly UserService _UserService;
	private static NewEngineMain newEngineMain;

	public UsersController(UserService UserService, InvestmentVehicleService investmentVehicleService) {
		_UserService = UserService;
		newEngineMain = new NewEngineMain(UserService, investmentVehicleService);
	}

	[EnableCors]
	[HttpGet]
	public async Task<UserInfoModel> Get() =>
		await newEngineMain.HandleReadUser();

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