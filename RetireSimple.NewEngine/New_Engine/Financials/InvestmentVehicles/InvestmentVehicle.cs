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

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public abstract class InvestmentVehicle : Financial{

		private IGrowthModel growthModel;

		private List<Investment> investments;

		private InvestmentVehicleInfoModel info;

		protected Service<InvestmentVehicleInfoModel> service;

		protected Service<InvestmentInfoModel> investmentService;


		public InvestmentVehicle(string id, FinCategories category, IGrowthModel growthModel) : base(id, FinCategories.INVESTMENT_VEHICLE)
		{
			this.growthModel = growthModel;
			this.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>());
			this.investmentService = new Service<InvestmentInfoModel>("Investments", new MongoService<InvestmentInfoModel>());
			this.investments = new List<Investment>();
		}

		public async Task UpdateInfo(InvestmentVehicleInfoModel info) {

			await this.service.HandleUpdateAsync(base.id, info);

		}

		public bool Equals(string id) {
			return base.id == id;
		}
		

		public List<Investment> GetInvestments() {
			return this.investments;
		}

		public void AddInvestment(Investment investment) {
			this.investments.Add(investment);
		}

		public void UpdateInvestment(string id, Investment investment) {

		}
		

		public async Task SetInfo(InvestmentVehicleInfoModel info) {

			await this.service.HandleCreateAsync(info);
		}

		public async Task<InvestmentVehicleInfoModel> GetInfo() {
			return await this.service.HandleGetAsync(base.id);
		}

		public async override Task<Projection> Calculate(int years) 
		{
			InvestmentVehicleInfoModel info = await this.service.HandleGetAsync(this.id);

			Console.WriteLine("Testing IV");

			return this.growthModel.GenerateProjection(info.Value, years, info);
		}



	}
}
