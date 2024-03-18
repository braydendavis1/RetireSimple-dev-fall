using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Investments {
	public class Stock : Investment {

		public Stock(string id, string name, double price, double rate)
		: base(id, name, price, rate) {

		}
	}
}
