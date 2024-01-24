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
	public class PortfolioManager : Manager<InvestmentVehicleInfoModel> {


		public async Task<List<InvestmentVehicleInfoModel>> HandleGetInvestmentVehicles() {
			List<InvestmentVehicleInfoModel> vehiclesInfoModels = new List<InvestmentVehicleInfoModel>();
			for (int i = 0; i < base.items.Count; i++) {
				InvestmentVehicleInfoModel info = await base.items[i].GetInfo();
				vehiclesInfoModels.Add(info);
			}
			return vehiclesInfoModels;

		}

		public abstract Task HandleCreateNewInvestmentVehicle(InvestmentVehicleInfoModel info);




		public async Task UpdateInvestmentVehcile(string id, InvestmentVehicleInfoModel info) {

		}

		public async Task DeleteInvestmentVehicle(string id) {

		}

	}
}
