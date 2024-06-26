﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels {
	public class InvestmentVehicleInfoModel : Info {


		public string Name { get; set; }

		public double Value { get; set; }

		public string Type { get; set; }

		//What percent of your salary do you plan on contributing yearly
		public double? Contributions { get; set; }

		//How much money do you make a year
		public double? Salary { get; set; }

		//How much do you expect for your salary to increase in a given year
		public double? SalaryIncrease { get; set; }

		//What is your expected rate of return
		public double? Rate { get; set; }

		//How much does your employer match
		public double? EmployerMatch { get; set; }

		//Up to what percent do they match until 
		public double? EmployerMatchCap { get; set; }

		//
		public string ContributionType { get; set; }

		//used for roth IRA and lump sum for 401k
		public double? Annual_Contribution { get; set; }

		public List<string>? ExpenseIds { get; set; }

		public double? Projection { get; set; }


	}
}
