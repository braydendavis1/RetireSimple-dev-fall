using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class ExpenseManager {

		public List<Expense> expenses;

		private Service<ExpenseInfoModel> service;

		public ExpenseManager() {
			this.service = new Service<ExpenseInfoModel>("Expenses", new MongoService<ExpenseInfoModel>());

			this.expenses = new List<Expense>();
		}


		//internal Task CreateExpense(ExpenseInfoModel info, string type) => throw new NotImplementedException();
		//internal Task DeleteExpenseInfoModel(string id) => throw new NotImplementedException();
		//internal Task<List<ExpenseInfoModel>> GetAllExpensesInfoModel() => throw new NotImplementedException();
		//internal Task<ExpenseInfoModel> GetExpenseInfoModel(string id) => throw new NotImplementedException();
		//internal Task UpdateExpense(string id, ExpenseInfoModel info) => throw new NotImplementedException();

		public async Task LoadExpenses() {
			List<ExpenseInfoModel> ExpensesInfo = await this.service.HandleGetAsync();

			this.expenses = new List<Expense>();

			for (int i = 0; i < ExpensesInfo.Count; i++) {
				this.expenses.Add(ExpenseLoader.Load(ExpensesInfo[i]));
			}
		}


		public async Task<List<ExpenseInfoModel>> GetExpenseInfoModels() {

			return await this.service.HandleGetAsync();

		}

		public async Task<ExpenseInfoModel> GetExpenseInfoModel(string id) {

			return await this.service.HandleGetAsync(id);

		}

		public async Task CreateExpense(ExpenseInfoModel info) {
			Expense expense;
			if (info.Type.ToLower().Equals("monthly")) {
				expense = new MonthlyExpense(info.Id, info.Amount, info.Start, info.Name, info.End);

			} else if (info.Type.ToLower().Equals("annual")){
				expense = new AnnualExpense(info.Id, info.Amount, info.Start, info.Name, info.End);

			}else {
				expense = new OneTimeExpense(info.Id, info.Amount, info.Start, info.Name);

			}
			this.expenses.Add(expense);
			//Console.WriteLine(info.Id);
			await expense.SetInfo(info);
			

		}

		public async Task UpdateExpense(string id, ExpenseInfoModel info) {
			//await this.service.HandleUpdateAsync(id, info);
			await this.LoadExpenses();
			int index = -1;
			Console.WriteLine(this.expenses.Count);
			for(int i = 0; i < this.expenses.Count; i++) {
				if (this.expenses[i].Equals(id)) {
					index = i;
					Console.WriteLine(this.expenses[i]);
				}
			}
			if (index != -1) {
				await this.expenses[index].UpdateInfo(info);
			}
		}

		public async Task DeleteExpenseInfoModel(string id) {
			int index = -1;
			for (int i = 0; i < this.expenses.Count; i++) {
				if (this.expenses[i].Equals(id)) {
					index = i;
				}
			}
			if (index != -1) {
				this.expenses.RemoveAt(index);
			}

			await this.service.HandleDeleteAsync(id);
		}

		public async Task<Projection> GetVehicleProjection(string id, int years) {
			int index = -1;
			for (int i = 0; i < this.expenses.Count; i++) {
				if (this.expenses[i].Equals(id)) {
					Expense vehicle = this.expenses[i];

					return await vehicle.Calculate(years);
				}
			}
			return null;
		}

		public async Task<Projection> CalculatePortfolioProjection(int years) {
			//await this.LoadExpenses();
			Projection projection = new Projection(new List<double>(), 0);
			for (int i = 0; i < this.expenses.Count; i++) {
				projection = projection.Add(await this.expenses[i].Calculate(years));

				List<double> calc = this.expenses[i].Calculate(years).Result.yearly_projections;
				Console.WriteLine(this.expenses[i].id + "here");
				for(int j = 0; j < calc.Count; j++) {
					Console.Write(calc[i] + ", ");
				}

			}
			return projection;
		}


		
	}
}
