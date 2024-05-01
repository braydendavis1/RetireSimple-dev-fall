using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.GrowthModels.PensionGrowthModels;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.Pension {
	public class Pension : InvestmentVehicle {
		public Pension(string id) : base(id, FinCategories.INVESTMENT_VEHICLE, new PensionGrowth()) {

			//base.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new  MongoService<InvestmentVehicleInfoModel>());

		}



	}
}
