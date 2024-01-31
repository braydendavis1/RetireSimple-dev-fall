using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Investments {
	public class Stock : Investment {

		public Stock(string symbol, string name, double price, double quantity)
		: base(symbol, name, price, quantity) {

		}
	}
}
