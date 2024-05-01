using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.GrowthModels.RothIraGrowth {
	public class RothIraGrowth : IGrowthModel {
		public Projection GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) 
		{

			List<double> values = new List<double>();
			values.Add(value);

			for(int i =0; i < years; i++) {
				double newVal = (double)((values[i] + info.Annual_Contribution) * (1 * info.Rate));
				values.Add((newVal));
			}

			return new Projection(values, 0);

		}

		//Projection IGrowthModel.GenerateProjection(double value, int years, InvestmentVehicleInfoModel info, List<Expense> expenses) => throw new NotImplementedException();
	}
}
