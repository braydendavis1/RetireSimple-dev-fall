using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using System.Runtime.InteropServices;
using RetireSimple.NewEngine.New_Engine.Database;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using MongoDB.Driver;
using static MongoDB.Driver.WriteConcern;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public abstract class InvestmentVehicle : DatabaseObject<InvestmentVehicleInfoModel> {

		private IGrowthModel growthModel;

		private List<Investment> investments;

		private InvestmentVehicleInfoModel info;

		private List<Expense> expenses;

		
		//protected Service<InvestmentVehicleInfoModel> service;
		

		protected Service<InvestmentInfoModel> investmentService;


		public InvestmentVehicle(string id, FinCategories category, IGrowthModel growthModel) : base(id, new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>()))
		{
			this.growthModel = growthModel;
			//this.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>());
			this.investmentService = new Service<InvestmentInfoModel>("Investments", new MongoService<InvestmentInfoModel>());
			this.investments = new List<Investment>();
		}

		/*
		public bool Equals(string id) {
			return base.id == id;
		}
		*/

		public async Task AddExpense(string expenseId) {
			var filter = Builders<InvestmentVehicleInfoModel>.Filter.Eq(investmentVehicle => investmentVehicle.Id, this.id);

			//Console.WriteLine(info.Id);
			//Issue is here
			var update = Builders<InvestmentVehicleInfoModel>.Update.Push<string>(investmentVehicle => investmentVehicle.ExpenseIds,  expenseId);

			 await base.UpdateNestedObject(filter, update);

		}
		

		public List<Investment> GetInvestments() {
			return this.investments;
		}

		public void AddInvestment(Investment investment) {
			this.investments.Add(investment);
		}



		public void UpdateInvestment(string id, Investment investment) {

		}

		/*
		public async Task UpdateInfo(InvestmentVehicleInfoModel info) {

			await this.service.HandleUpdateAsync(base.id, info);

		}


		public async Task SetInfo(InvestmentVehicleInfoModel info) {

			await this.service.HandleCreateAsync(info);
		}

		public async Task<InvestmentVehicleInfoModel> GetInfo() {
			return await this.service.HandleGetAsync(base.id);
		}
		*/

		public async Task<Projection> Calculate(int years) 
		{
			InvestmentVehicleInfoModel info = await base.GetInfo();

			//Console.WriteLine("Testing IV");

			return this.growthModel.GenerateProjection(info.Value, years, info, this.expenses);
		}



	}
}
