using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.GrowthModels._457bGrowthModels {
	public class _457bGrowth: IGrowthModel {


		public  Projection GenerateProjection(double value, int years, InvestmentVehicleInfoModel info) {
			List<double> values = new List<double>();

			values.Add(value);

			for (int i = 0; i < years; i++) {

				//percent of salary contributions * salary (considering increase)
				double personal_contribution = (double)(info.Contributions * this.CalculateSalaryIncrease(info, i));

				//employer contributions
				double employer_contribution = this.CalculateEmployerContributions(info, i);

				//previous value + personal contribution + employer contributions
				double newVal = values[i] + personal_contribution + employer_contribution;

				//value above * (1 + the projected growth rate) 
				double newVal_withGrowth = newVal * (1 + (double)(info.Rate));

				//add new value to list 
				values.Add(newVal_withGrowth);

			}

			return new Projection(values, 0);
		}
			



		private double CalculateEmployerContributions(InvestmentVehicleInfoModel info, int i) {

			double contributions;

			//If the percent contribution is less than the max employer match 
			if (info.Contributions < info.EmployerMatchCap) {

				//the percentage the employer will match * thhe salary (considering increase) * the percentage of contribution
				contributions = (double)(info.EmployerMatch * this.CalculateSalaryIncrease(info, i) * (info.Contributions));
			} else {

				//the percentage the employer will match * the salary (considering increase) * the max match of the employer
				contributions = (double)(info.EmployerMatch * this.CalculateSalaryIncrease(info, i) * info.EmployerMatchCap);
			}

			return contributions;


		}

		private double CalculateSalaryIncrease(InvestmentVehicleInfoModel info, int i) {

			//base salary * (1 + salary increase rate) ^ i 
			return (double)(info.Salary * Math.Pow((double)(1 + info.SalaryIncrease), i));
		}

		Projection IGrowthModel.GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) => throw new NotImplementedException();
	}
}
	
