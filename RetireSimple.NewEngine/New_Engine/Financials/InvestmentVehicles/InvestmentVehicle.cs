﻿using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.GrowthModels;
using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public abstract class InvestmentVehicle : Financial<InvestmentVehicleInfoModel> {


		private IGrowthModel growthModel;

		private List<Investment> investments;

		private InvestmentVehicleInfo info;


		

		public InvestmentVehicle(string id, IGrowthModel growthModel, InvestmentVehicleInfoModel info, Service<InvestmentVehicleInfoModel> service ) : base(id, service)
		{
		
			this.growthModel = growthModel;
			this.investments = new List<Investment>();
			
			
		}

	

		public override Projection Calculate(int years) 
		{



			return this.growthModel.GenerateProjection(this.value, years, this.info);
		}



	}
}
