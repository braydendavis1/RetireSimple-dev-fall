using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels {
	public class RothIraInfoModel : InvestmentVehicleInfoModel {

		public double annual_contributions;

		public double rate;


		public RothIraInfoModel(double annual_contributions, double rate) {
			this.annual_contributions = annual_contributions;
			this.rate = rate;
		}

	}
}
