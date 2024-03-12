using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public abstract class Expense : Financial {

		public double amount;
		public int start;

		private Service<ExpenseInfoModel> Service;
		public Expense(string id, double amount, int start) : base(id, FinCategories.EXPENSE) {

			this.amount = amount;
			this.start = start;
			this.Service = new Service<ExpenseInfoModel>("Expenses", new MongoService<ExpenseInfoModel>());

		}

		public async override Task<Projection> Calculate(int years) {
			return this.GenerateProjection(years);
		}

		public abstract Projection GenerateProjection(int years);

		public async Task SetInfo(ExpenseInfoModel info) {
			await this.Service.HandleCreateAsync(info);
		}

	}
}
