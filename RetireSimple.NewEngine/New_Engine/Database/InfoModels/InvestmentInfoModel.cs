using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels {
	public class InvestmentInfoModel : Info {

		

		//name for the investment
		public string Name { get; set; }

		//individual price of the investment (price of one stock/bond)
		public double Price { get; set; }

		public string Type { get; set;  }

		public string vehicleId { get; set; }

		public double currentValue { get; set; }

		public double cost { get; set; }

		public double rate { get; set; }

		public double bondLength { get; set; }

		// total number of investment
		public double Quantity { get; set; }

		private DateTime LastUpdated { get; set; }



	}
}
