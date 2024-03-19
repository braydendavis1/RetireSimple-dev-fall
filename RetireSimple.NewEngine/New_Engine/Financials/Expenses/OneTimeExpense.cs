using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public class OneTimeExpense : Expense {
		public OneTimeExpense(string id, double amount, int start, string name) : base( id, amount, start, name) {
		}

		public override Projection GenerateProjection(int years) 
		{
			List<double> values = new List<double>();
			if( years > 0 ) {
				values.Add(base.amount);
			}
			for(int i = 1; i < years; i++) {
				values.Add(0);
			}

			return new Projection(values, base.start); 
		}
	}
}
