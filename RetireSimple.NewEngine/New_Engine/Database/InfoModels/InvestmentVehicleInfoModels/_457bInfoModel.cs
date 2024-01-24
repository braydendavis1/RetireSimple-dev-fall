using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels {
	public class _457bInfoModel : InvestmentVehicleInfoModel {

		//What percent of your salary do you plan on contributing yearly
		public double contributions;

		//How much money do you make a year
		public double salary;

		//How much do you expect for your salary to increase in a given year
		public double salaryIncrease;

		//What is your expected rate of return
		public double rate;

		//How much does your employer match
		public double employerMatch;

		//Up to what percent do they match until 
		public double employerMatchCap;


		public _457bInfoModel(double contributions, double salary, double salaryIncrease, double rate, double employerMatch, double employerMatchCap) {
			this.contributions = contributions;
			this.salary = salary;
			this.salaryIncrease = salaryIncrease;
			this.rate = rate;
			this.employerMatch = employerMatch;
			this.employerMatchCap = employerMatchCap;
		}

	}
}
