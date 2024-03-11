using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public static class ExpenseManagerLoader {

		public async static Task<ExpenseManager> Load() {
			ExpenseManager expenseManager = new ExpenseManager();
			await expenseManager.LoadExpenses();
			return expenseManager;
		}
	}
}
