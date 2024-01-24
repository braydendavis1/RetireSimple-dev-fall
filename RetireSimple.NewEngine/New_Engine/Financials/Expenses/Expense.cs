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
	public abstract class Expense : Financial<Info> {

		public double amount;
		public int start;
		public Expense(string id, double amount, int start, Service<Info> service) : base(id, service) {

			this.amount = amount;
			this.start = start;

		}

		public override async Task<Projection> Calculate(int years) {
			return this.GenerateProjection(years);
		}

		public abstract Projection GenerateProjection(int years);
	}
}
