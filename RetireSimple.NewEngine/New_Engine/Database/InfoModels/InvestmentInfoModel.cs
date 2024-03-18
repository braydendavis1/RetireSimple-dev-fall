using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels {
	public class InvestmentInfoModel : Info {

		

		//name for the investment
		public string investmentName { get; set; }

		//individual price of the investment (price of one stock/bond)
		public double currentValue { get; set; }

		public string investmentType { get; set;  }

		public string vehicleId { get; set; }

		public double cost { get; set; }

		public double rate { get; set; }

		public double bondLength { get; set; }

		public double bondQuantity {get; set; }

		private DateTime LastUpdated { get; set; }

	}
}
