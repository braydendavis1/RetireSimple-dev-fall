using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;


//used this website to verify calculations https://www.annuityexpertadvice.com/calculator/401k-calculator/ 

namespace RetireSimple.NewEngine.New_Engine.GrowthModels._401kGrowthModels {
	public class _cashGrowth : IGrowthModel {

		public _cashGrowth() {

		}


		public Projection GenerateProjection(double value, int years, InvestmentVehicleInfoModel info) {
			List<double> values = new List<double>();

			for (int i = 0; i < years; i++) {
				values.Add(value);
			}

			return new Projection(values, 0);


		}

		Projection IGrowthModel.GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) => throw new NotImplementedException();
	}
}
