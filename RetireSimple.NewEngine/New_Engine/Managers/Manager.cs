using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	abstract public class Manager<T> where T : Info {

		protected List<Financial<T>> items;


		public Manager() 
		{
			this.items = new List<Financial<T>>();

		}

		public Projection Calculate(int years) 
		{

			Projection projection = new Projection(new List<double>(), 0);

			foreach (Financial<T> f in this.items) {
				projection = projection.Add(f.Calculate(years));
			}

			return projection;

		}



	}
}
