using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Investments {
	public abstract class Investment {

		private string Id;

		//name for the investment
		private string Name;

		//individual price of the investment (price of one stock/bond)
		private double Price;

		// total number of investment
		private double Quantity;

		private DateTime LastUpdated;

		public Investment(string Id, string Name, double Price, double Quantity) {
			this.Id = Id;
			this.Name = Name;
			this.Price = Price;
			this.Quantity = Quantity;
			this.LastUpdated = DateTime.Now;
		}

		public double Calculate() {
			return this.Price*this.Quantity;
		}


	}
}
