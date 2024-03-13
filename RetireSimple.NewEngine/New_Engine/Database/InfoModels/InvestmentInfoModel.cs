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

		// total number of investment
		public double Quantity { get; set; }

		private DateTime LastUpdated { get; set; }

	}
}
