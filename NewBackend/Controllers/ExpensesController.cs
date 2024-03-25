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

	private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
	public ExpensesController(NewEngineMain newEngineMain) {

		this.newEngineMain = newEngineMain;
	}

	[EnableCors]
	[HttpGet]
	public async Task<List<ExpenseInfoModel>> Get() {

		logger.Info("GET Expenses");

		try {
			
			return await newEngineMain.HandleReadAllExpenses();
		}catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("ERROR: {0}", e.Message);
			return null;
		}
	}
		

	[EnableCors]
	[HttpGet]
	[Route("{id}")]
	public async Task<ExpenseInfoModel> Get(string id) {

		logger.Info("GET Expense {0}", id);

		try {
			return await newEngineMain.HandleReadExpense(id);
		}catch (Exception e) {
			BadRequest("Error: " + e.Message);
			logger.Error("ERROR: {0}", e.Message);
			return null;
		}
	
	}

	//Initialization
	[HttpPost]
	public async Task<IActionResult> Post(ExpenseInfoModel newExpenses) {

		logger.Info("POST NEW Expense {0}", newExpenses.Id );

		try {
			await newEngineMain.HandleCreateExpense(newExpenses);

			return CreatedAtAction(nameof(Get), new { id = newExpenses.Id }, newExpenses);
		} catch (Exception e) {
			logger.Error("ERROR: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}


	}

	[HttpPut]
	public async Task<IActionResult> Update(string id, ExpenseInfoModel updatedExpenses) {

		logger.Info("PUT Expense {0}", id);

		try {

			await newEngineMain.HandleUpdateExpense(id, updatedExpenses);

			return NoContent();
		}catch (Exception e) {

			logger.Error("ERROR: {0}", e.Message);
			return BadRequest("Error: " + e.Message);
		}

	}

	[HttpDelete]
	public async Task<IActionResult> Delete(string id) {

		logger.Info("DELETE Expense {0}", id);

		try {
			await newEngineMain.HandleDeleteExpense(id);
			return NoContent();
		} catch(Exception e) {
			return BadRequest("Error: " + e.Message);
		}
		
	}


}