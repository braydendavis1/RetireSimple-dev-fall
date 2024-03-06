using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RetireSimple.NewEngine.New_Engine.Financials;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._401k;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.Engine.New_Engine;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager  {


		public List<InvestmentVehicle> investmentVehicles;
		private Service<InvestmentVehicleInfoModel> service;
		

		public PortfolioManager() {
			this.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>());

			this.investmentVehicles = new List<InvestmentVehicle>();

			
		}

		public async Task LoadInvestmentVehicles() {
			List<InvestmentVehicleInfoModel> investmentVehiclesInfo = await this.service.HandleGetAsync();
	
			for (int i = 0; i < investmentVehiclesInfo.Count; i++) {
				this.investmentVehicles.Add(InvestmentVehicleLoader.Load(investmentVehiclesInfo[i]));
			}
		}

		public override bool Add(Financial f) 
		{
			if(f.category == FinCategories.INVESTMENT_VEHICLE) {
				base.items.Add(f);
				return true;
			} 
			else { 
				return false; 
			}


		}

		public override bool DoDelete(int id) {
			base.items.RemoveAt(id);
			return true;
		}
		public override Financial DoRead(int id) {

			return base.items[id];
		}
		public override bool DoUpdate(Financial f, int id) {
			base.items[id] = f;
			return true;
		}


		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicleInfoModels() {

			return await this.service.HandleGetAsync();
			


		}

		public async Task<InvestmentVehicleInfoModel> GetInvestmentVehicleInfoModel(string id) {

			return await this.service.HandleGetAsync(id);

		}

		public async Task CreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			if (type.Equals("401k")) {
				_401k vehicle = new _401k(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			}

		}

		public async Task UpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			await this.service.HandleUpdateAsync(id, info);

		}

		public async Task DeleteInvestmentVehicleInfoModel(string id) {
			int index = -1;
			for(int i = 0; i <  this.investmentVehicles.Count; i++) {
				if (this.investmentVehicles[i].Equals(id)) {
					index = 0;
				}
			}
			if(index != -1) {
				this.investmentVehicles.RemoveAt(index);
			}
			
			await this.service.HandleDeleteAsync(id);
		}

		public async Task<Projection> GetVehicleProjection(string id, int years) {
			int index = -1;
			for (int i = 0; i < this.investmentVehicles.Count; i++) {
				if (this.investmentVehicles[i].Equals(id)) {
					InvestmentVehicle vehicle = this.investmentVehicles[i];
					
					return await vehicle.Calculate(years);
				}
			}
			return null;
		}

		public async Task<Projection> CacluatePortfolioPorjection(int years) {
			//await this.LoadInvestmentVehicles();
			Projection projection = new Projection(new List<double>(), 0);
			for (int i = 0; i < this.investmentVehicles.Count; i++) {
				projection = projection.Add(await this.investmentVehicles[i].Calculate(years));
				Console.WriteLine(this.investmentVehicles[i].id);
			}
			return projection;
		}
	}

	


}
