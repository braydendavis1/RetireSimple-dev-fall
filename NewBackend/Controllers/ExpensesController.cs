using Microsoft.AspNetCore.Mvc;
using NewBackend.Services;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine;
using Microsoft.AspNetCore.Cors;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

namespace ExpensestoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase {
	//private readonly ExpenseService _ExpenseService;
	private readonly NewEngineMain newEngineMain;

	public ExpensesController(NewEngineMain newEngineMain) {

		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<ExpenseInfoModel>> Get() =>
		 await newEngineMain.HandleReadAllExpenses();

	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<ExpenseInfoModel> Get(string id) {
		return await newEngineMain.HandleReadExpense(id);
	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(ExpenseInfoModel newExpenses) {
		//await _ExpenseService.CreateAsync(newExpenses);

		await newEngineMain.HandleCreateExpense(newExpenses);

		return CreatedAtAction(nameof(Get), new { id = newExpenses.Id }, newExpenses);
	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, ExpenseInfoModel updatedExpenses) {
		//var Expenses = await _ExpenseService.GetAsync(id);

		await newEngineMain.HandleUpdateExpense(id, updatedExpenses);

		return NoContent();
	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {
		await newEngineMain.HandleDeleteExpense(id);
		return NoContent();
	}


}