using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RetireSimple.NewEngine.New_Engine.Financials;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using System.ComponentModel;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager : Manager {
		private readonly InvestmentVehicleService _investmentVehicleService;

		public PortfolioManager(InvestmentVehicleService service) : base(){
			this._investmentVehicleService = service;
		}

		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicles() {
			return await this._investmentVehicleService.GetAsync();
		}

		public async Task CreateNewInvestmentVehicle(InvestmentVehicleInfoModel info) {
			await this._investmentVehicleService.CreateAsync(info);
		}

		public async Task UpdateInvestmentVehcile(string id, InvestmentVehicleInfoModel info) {
			await this._investmentVehicleService.UpdateAsync(id, info);
		}

		public async Task DeleteInvestmentVehicle(string id) {
			await this._investmentVehicleService.RemoveAsync(id);
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
	}
}
