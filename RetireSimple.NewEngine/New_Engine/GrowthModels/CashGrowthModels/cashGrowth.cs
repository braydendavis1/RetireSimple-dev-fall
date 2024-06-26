﻿using RetireSimple.Engine.New_Engine;
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

namespace RetireSimple.NewEngine.New_Engine.GrowthModels.CashGrowthModels {
	public class CashGrowth : IGrowthModel {

		public CashGrowth() {

		}


		public Projection GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) {
			List<double> values = new List<double>();

			for (int i = 0; i < years; i++) {
				values.Add(value - CalculateExpenses(expenses, i));
			}

			return new Projection(values, 0);


		}

		private static double CalculateExpenses(List<Expense> expenses, int year) {

			double total = 0;

			if (expenses != null) {
				for (int i = 0; i < expenses.Count; i++) {
					if (expenses[i].start >= year) {
						total += expenses[i].amount;
					}
				}
			}

			return total;
		}

	}
}
