using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public abstract class Expense : DatabaseObject<ExpenseInfoModel> {

		public string name;
		public double amount;
		public int start;

		private Service<ExpenseInfoModel> Service;
		public Expense(string id, double amount, int start, string name) : base(id, new Service<ExpenseInfoModel>("Expenses", new MongoService<ExpenseInfoModel>())) {

			this.amount = amount;
			this.start = start;
			this.name = name;
			//this.Service = new Service<ExpenseInfoModel>("Expenses", new MongoService<ExpenseInfoModel>());
		}

		public async Task<Projection> Calculate(int years) {
			return this.GenerateProjection(years);
		}

		public abstract Projection GenerateProjection(int years);

		/*
		public async Task SetInfo(ExpenseInfoModel info) {
			await this.Service.HandleCreateAsync(info);
		}

		public async Task UpdateInfo(ExpenseInfoModel info) {
			await this.Service.HandleUpdateAsync(info.Id, info);
		}

		public async Task GetInfo(string id) {
			await this.Service.HandleGetAsync(id);
		}

		
		public bool Equals(string id) {
			return base.id == id;
		}
		*/

	}
}
