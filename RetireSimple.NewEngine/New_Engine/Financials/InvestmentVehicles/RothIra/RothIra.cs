﻿using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.GrowthModels.RothIraGrowth;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.RothIra {
	public class RothIra : InvestmentVehicle {
		public RothIra(string id) : base(id, FinCategories.INVESTMENT_VEHICLE, new RothIraGrowth()) {
		}
	}
}
