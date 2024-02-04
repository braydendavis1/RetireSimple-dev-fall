using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public static class InvestmentVehicleLoader {



		public static InvestmentVehicle Load(InvestmentVehicleInfoModel info) {
			if (info.Type.Equals("401k")) {
				return new _401k._401k(info.Id);
			} else {
				return null;
			}
		}
	}
}
