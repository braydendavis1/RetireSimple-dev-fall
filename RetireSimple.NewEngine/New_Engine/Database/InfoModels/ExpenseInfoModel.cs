using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels {
	public class ExpenseInfoModel : Info {
		public int Start { get; set; }
		public double Amount { get; set; }
		public string Type { get; set; }
		public int End { get; set; }
		public string Name { get; set; }

	}
}
