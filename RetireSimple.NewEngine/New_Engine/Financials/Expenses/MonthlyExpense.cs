using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.Expenses {
	public class MonthlyExpense : Expense {
		public MonthlyExpense(string id, double amount, int start, Service<Info> service) : base( id, amount, start, service) {
		}

		public override Projection GenerateProjection(int years) 
		{
			List<double> values = new List<double>();
			
			for(int i = 0; i < years; i++) {
				values.Add(base.amount);
			}

			return new Projection(values, base.start); 
		}
	}
}
