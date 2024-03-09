using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public static class ExpenseLoader {



		public static Expense Load(ExpenseInfoModel info) {
			if (info.Type.Equals("Monthly")) {
				return new MonthlyExpense(info.Id, info.Amount, info.Start);

			} else {
				return new OneTimeExpense(info.Id, info.Amount, info.Start);

			}
		}
	}
}
