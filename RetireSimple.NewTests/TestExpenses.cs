using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._401k;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.RothIra;
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.GrowthModels._401kGrowthModels;
using RetireSimple.NewEngine.New_Engine.Managers;
using RetireSimple.NewEngine.New_Engine.TaxModels;
using RetireSimple.NewEngine.New_Engine.Users;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewTests {
	[TestClass]
	public class TestExpenses {


		[TestMethod]
		public void TestExpenseProjections() {

			ExpenseManager expenseManager = new ExpenseManager();

			Expense expense1 = new MonthlyExpense("123", 50, 2, "utilities", 12);
			Expense expense2 = new OneTimeExpense("123", 150, 7, "medical");

			expenseManager.expenses.Add(expense1);
			expenseManager.expenses.Add(expense2);

			List<double> expenses = new List<double>();

			expenses.Add(750);
			for(int i = 1; i < 10; i++) {
				expenses.Add(600);
			}


			Projection correctProj = new Projection(expenses, 0);

			Projection proj = expenseManager.CalculatePortfolioProjection(10).Result;
			Console.WriteLine(proj);
			for(int i = 0; i < 10;i++) {
				Console.WriteLine(proj.yearly_projections[i] + ", " + correctProj.yearly_projections[i]);

				//Assert.AreEqual(correctProj.yearly_projections[i], proj.yearly_projections[i]);
			}

		}


	}
}
