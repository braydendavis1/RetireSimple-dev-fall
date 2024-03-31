using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;


//used this website to verify calculations https://www.annuityexpertadvice.com/calculator/401k-calculator/ 

namespace RetireSimple.NewEngine.New_Engine.GrowthModels._401kGrowthModels {
	public class _401kGrowth : IGrowthModel {

		public _401kGrowth() {
		
		}


		public Projection GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) {
			List<double> values = new List<double>();

			values.Add(value);

			for (int i = 0; i < years; i++) {

				//percent of salary contributions * salary (considering increase)
				double personal_contribution = (double)(info.Contributions/100 * this.CalculateSalaryIncrease(info, i));

				//employer contributions
				double employer_contribution = this.CalculateEmployerContributions(info, i);

				double val = (double)(values[i] * (1 + info.Rate/100));

				if (info.Annual_Contribution != null && info.Annual_Contribution >= 0) {
					val += (double)info.Annual_Contribution;
				}

				double newVal = val + personal_contribution + employer_contribution;

				//previous value + personal contribution + employer contributions
				//double newVal = values[i] + personal_contribution + employer_contribution;

				//value above * (1 + the projected growth rate) 
				//double newVal_withGrowth = newVal * (1 + info.rate);

				//add new value to list 
				//values.Add(newVal_withGrowth);

				double newValMinusExpenses = val - CalculateExpenses(expenses, i);

				values.Add(newVal);
			}

			return new Projection(values, 0);


		}
		private double CalculateEmployerContributions(InvestmentVehicleInfoModel info, int i) {

			double contributions;

			//If the percent contribution is less than the max employer match 
			if(info.Contributions < info.EmployerMatchCap) {

				//the percentage the employer will match * thhe salary (considering increase) * the percentage of contribution
				contributions = (double)(info.EmployerMatch/ 100 * this.CalculateSalaryIncrease(info, i) * info.Contributions/100);
			} else {

				//the percentage the employer will match * the salary (considering increase) * the max match of the employer
				contributions = (double)(info.EmployerMatch/100 * this.CalculateSalaryIncrease(info, i) * info.EmployerMatchCap/100);
			}

			return contributions;


		}

		private double CalculateSalaryIncrease(InvestmentVehicleInfoModel info, int i) {

			//base salary * (1 + salary increase rate) ^ i 
			return (double)(info.Salary * Math.Pow((double)(1 + (info.SalaryIncrease / 100)), i));
		}

		private static double CalculateExpenses(List<Expense> expenses, int year) {

			double total = 0;

			for(int i = 0; i < expenses.Count; i++) {
				if (expenses[i].start >= year) {
					total += expenses[i].amount;
				}
			}

			return total;
		}
		
	}
}
