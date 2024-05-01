using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._401k;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public static class InvestmentVehicleLoader {



		public static InvestmentVehicle Load(InvestmentVehicleInfoModel info) {
			if (info.Type.ToLower().Equals("401k")) {
				return new _401k._401k(info.Id);
			} else if (info.Type.ToLower().Equals("457b")) {
				return new _457b._457b(info.Id);
			} else if (info.Type.ToLower().Equals("rothira")) {
				return new RothIra.RothIra(info.Id);
			//} else if (info.Type.Equals("403b")) {
			//	return new _403b._403b(info.Id);
			} else if (info.Type.Equals("cash")) {
				return new Cash.Cash(info.Id);
			} else if (info.Type.Equals("pension")) {
				return new Pension.Pension(info.Id);
			} else {
				//throw new Exception();
				return new _401k._401k(info.Id);
				//return null;
			}
		}
	}
}
