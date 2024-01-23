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

	public UsersController(UserService UserService) {
		_UserService = UserService;
		newEngineMain = new NewEngineMain(UserService);
	}

	[EnableCors]
	[HttpGet]
	public async Task<UserInfoModel> Get() =>
		await newEngineMain.HandleReadUser();

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(UserInfoModel newUsers) {
		await _UserService.CreateAsync(newUsers);

		newEngineMain.HandleCreateUser(new UserInfo(newUsers.Age, newUsers.RetirementAge, newUsers.RetirementGoal, UserInfo.StringToStatus(newUsers.FilingStatus)));

		return CreatedAtAction(nameof(Get), new { id = newUsers.Id }, newUsers);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, UserInfoModel updatedUsers) {
		var Users = await _UserService.GetAsync(id);

		if (Users is null) {
			return NotFound();
		}

		updatedUsers.Id = Users.Id;

		await _UserService.UpdateAsync(id, updatedUsers);

		newEngineMain.HandleUpdateUser(new UserInfo(updatedUsers.Age, updatedUsers.RetirementAge, updatedUsers.RetirementGoal, UserInfo.StringToStatus(updatedUsers.FilingStatus)));

		return NoContent();
	}

	
}