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
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._401k;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager : Manager<InvestmentVehicleInfoModel> {
		public PortfolioManager(InvestmentVehicleService service) : base(service) {

		}

		public async Task<InvestmentVehicleInfoModel?> GetInvestmentVehicle(string id) {
			return await base.items.Find(x => x.id.Equals(id)).GetInfo();

		}



		public async Task CreateNewInvestmentVehicle(InvestmentVehicleInfoModel info, IGrowthModel growthModel) {
			_401k vehicle = new _401k(info.Id, info, base.service);
			base.items.Add(vehicle);
			await vehicle.SetInfo(info);


		}


		public async Task UpdateInvestmentVehcile(string id, InvestmentVehicleInfoModel info) {
			await base.items.Find(x => x.id.Equals(id)).UpdateInfo(info);
		}

		public async Task DeleteInvestmentVehicle(string id) {
			InvestmentVehicle vehicle = (InvestmentVehicle)base.items.Find(x => x.id.Equals(id));
			base.items.Remove(vehicle);
			await vehicle.DeleteInfo();
		}

	}
}
