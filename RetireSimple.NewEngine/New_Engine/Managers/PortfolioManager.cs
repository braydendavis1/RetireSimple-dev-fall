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

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager : Manager {


		private List<InvestmentVehicle> investmentVehicles;

		public PortfolioManager() {
			
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


			List<Task> tasks = new();
			List<InvestmentVehicleInfoModel> models = new();

			investmentVehicles.ForEach(x => tasks.Add(Task.Run(async () => models.Add( await x.GetInfo()))));

			await Task.WhenAll(tasks);

			return models;


		}

		public async Task CreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			if (type.Equals("401k")) {
				_401k vehicle = new _401k("61a6058e6c43f32854e51f31");
				await vehicle.SetInfo(info);
			}

		}

		public async Task UpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			for(int i = 0; i < this.investmentVehicles.Count; i++) {
				InvestmentVehicle vehicle = this.investmentVehicles[i];

				if (vehicle.id.Equals(id)) {
					await vehicle.UpdateInfo(info);
				}
			}

		}
	}


}
