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
	//private readonly UserService _UserService;
	private readonly NewEngineMain newEngineMain;

	public UsersController(NewEngineMain newEngineMain) {
		
		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<UserInfoModel> Get() =>
		await newEngineMain.HandleReadUser();

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(UserInfoModel newUsers) {
		//await _UserService.CreateAsync(newUsers);

		await newEngineMain.HandleCreateUser(newUsers);

		return CreatedAtAction(nameof(Get), new { id = newUsers.Id }, newUsers);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, UserInfoModel updatedUsers) {
		//var Users = await _UserService.GetAsync(id);

		await newEngineMain.HandleUpdateUser(id, updatedUsers);

		return NoContent();
	}

	
}