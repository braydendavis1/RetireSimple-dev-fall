using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public class AnnualExpense : Expense {

		//TODO implement end into projection
		private int end;
		public AnnualExpense(string id, double amount, int start, string name, int end) : base( id, amount, start, name) {
			this.end = end;
		}

		public override Projection GenerateProjection(int years) 
		{
			List<double> values = new List<double>();
			
			for(int i = 0; i < this.end; i++) {
				values.Add(base.amount);
			}

			for(int i = 0; i < years - this.end; i++) {
				values.Add(0);
			}

			return new Projection(values, base.start); 
		}
	}
}
