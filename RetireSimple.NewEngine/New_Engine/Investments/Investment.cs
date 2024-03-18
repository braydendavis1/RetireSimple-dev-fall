using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Investments {
	public abstract class Investment {

		public string Id;

		//name for the investment
		private string Name;

		private string Type;



		//individual price of the investment (price of one stock/bond)
		private double Price;

		private double Value;

		private double Cost;

		private double Rate;

		// total number of investment
		private double Quantity;

		private DateTime LastUpdated;

		/*Investment {
			investmentId: string | null;
			investmentName: string | null;
			investmentType: string | null;
			vehicleId: string | null;
			projection: number | null
			currentValue: number | null;
			cost: number | null;
			rate: number | null;
			bondLength: number | null;
		*/
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
