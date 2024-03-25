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

	private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

	public UsersController(NewEngineMain newEngineMain) {
		
		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<UserInfoModel> Get() {

		logger.Info("GET User");

		try {
			return await newEngineMain.HandleReadUser();
		} catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}

		
	}
		

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(UserInfoModel newUsers) {

		logger.Info("POST User {0}", newUsers.Id);

		try {
			await newEngineMain.HandleCreateUser(newUsers);

			return CreatedAtAction(nameof(Get), new { id = newUsers.Id }, newUsers);
		} catch (Exception e) 
		{
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}
	
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, UserInfoModel updatedUsers) {

		logger.Info("PUT User {0}", id);

		try {
			await newEngineMain.HandleUpdateUser(id, updatedUsers);

			return NoContent();
		}catch (Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}

	}

	
}