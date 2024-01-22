using Microsoft.AspNetCore.Mvc;

using NewBackend.Models;
using NewBackend.Services;

using RetireSimple.NewEngine.New_Engine.Users;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;

namespace UserstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
	private readonly UsersService _UsersService;
	private static NewEngineMain newEngineMain;

	public UsersController(UsersService UsersService) {
		_UsersService = UsersService;
		newEngineMain = new NewEngineMain();
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<Users>> Get() =>
		await _UsersService.GetAsync();

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(Users newUsers) {
		await _UsersService.CreateAsync(newUsers);

		newEngineMain.HandleCreateUser(new UserInfo(newUsers.Age, newUsers.RetirementAge, newUsers.RetirementGoal, UserInfo.StringToStatus(newUsers.FilingStatus)));

		return CreatedAtAction(nameof(Get), new { id = newUsers.Id }, newUsers);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, Users updatedUsers) {
		var Users = await _UsersService.GetAsync(id);

		if (Users is null) {
			return NotFound();
		}

		updatedUsers.Id = Users.Id;

		await _UsersService.UpdateAsync(id, updatedUsers);

		newEngineMain.HandleUpdateUser(new UserInfo(updatedUsers.Age, updatedUsers.RetirementAge, updatedUsers.RetirementGoal, UserInfo.StringToStatus(updatedUsers.FilingStatus)));

		return NoContent();
	}

	
}