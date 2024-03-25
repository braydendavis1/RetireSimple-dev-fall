using Microsoft.AspNetCore.Mvc;
using NewBackend.Services;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

namespace InvestmentstoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentsController : ControllerBase {
	//private readonly InvestmentService _InvestmentService;
	private readonly NewEngineMain newEngineMain;

	private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

	public InvestmentsController(NewEngineMain newEngineMain) {

		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<InvestmentInfoModel>> Get() {

		logger.Info("GET Investments");

		try {
			return await newEngineMain.HandleReadAllInvestments();
		}catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}
		
	}
		

	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<InvestmentInfoModel> Get(string id) {

		logger.Info("GET Investment {0}", id);

		try {
			return await newEngineMain.HandleReadInvestment(id);
		}catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("Error: {0}", e.Message);
			return null;
		}
		
	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentInfoModel newInvestments) {

		logger.Info("POST New Investment {0}", newInvestments.Id);

		try {
			await newEngineMain.HandleCreateInvestment(newInvestments);

			return CreatedAtAction(nameof(Get), new { id = newInvestments.Id }, newInvestments);
		} catch (Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}

	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentInfoModel updatedInvestments) {

		logger.Info("PUT Investment {0}", id);

		try {
			await newEngineMain.HandleUpdateInvestment(id, updatedInvestments);

			return NoContent();
		}catch (Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}


	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {

		logger.Info("DELETE Investment {0}", id);

		try {
			await newEngineMain.HandleDeleteInvestment(id);
			return NoContent();
		}catch (Exception e) {
			logger.Error("Error: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}
		
	}


}