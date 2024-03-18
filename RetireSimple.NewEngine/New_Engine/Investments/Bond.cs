using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Investments {
	public class Bond : Investment {

		private double BondLength;

		public Bond(string id, string name, double price, double quantity)
		: base(id, name, price, quantity) {

		}


	}
}
