using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels {
	public class _401kInfoModel : InvestmentVehicleInfoModel {

		public double Contributions { get; set; }
		public double Salary { get; set; }
		public double SalaryIncrease { get; set; }
		public double Rate { get; set; }
		public double EmployerMatch { get; set; }
		public double EmployerMatchCap {  get; set; }	


	}
}
