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

	public InvestmentsController(NewEngineMain newEngineMain) {

		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<InvestmentInfoModel>> Get() =>
		 await newEngineMain.HandleReadAllInvestments();

	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<InvestmentInfoModel> Get(string id) {
		return await newEngineMain.HandleReadInvestment(id);
	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(InvestmentInfoModel newInvestments) {
		//await _InvestmentService.CreateAsync(newInvestments);

		await newEngineMain.HandleCreateInvestment(newInvestments);

		return CreatedAtAction(nameof(Get), new { id = newInvestments.Id }, newInvestments);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, InvestmentInfoModel updatedInvestments) {
		//var Investments = await _InvestmentService.GetAsync(id);

		await newEngineMain.HandleUpdateInvestment(id, updatedInvestments);

		return NoContent();
	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {
		await newEngineMain.HandleDeleteInvestment(id);
		return NoContent();
	}


}