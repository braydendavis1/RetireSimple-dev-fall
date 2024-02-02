using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
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
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using System.Runtime.InteropServices;

namespace RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles {
	public abstract class InvestmentVehicle : Financial{

		private IGrowthModel growthModel;

		private List<Investment> investments;

		private InvestmentVehicleInfoModel info;

		protected Service<InvestmentVehicleInfoModel> service;

		

		

		public InvestmentVehicle(string id, FinCategories category, IGrowthModel growthModel) : base(id, FinCategories.INVESTMENT_VEHICLE)
		{
			this.growthModel = growthModel;
			this.investments = new List<Investment>();

		}

		public async Task UpdateInfo(InvestmentVehicleInfoModel info) {

			await service.HandleUpdateAsync(this.id, info);

		}

		public async Task SetInfo(InvestmentVehicleInfoModel info) {

			await service.HandleCreateAsync(info);
		}

		public async Task<InvestmentVehicleInfoModel> GetInfo() {
			return await service.HandleGetAsync(this.id);
		}

		public async override Task<Projection> Calculate(int years) 
		{
			InvestmentVehicleInfoModel info = await service.HandleGetAsync(this.id);

			return await this.growthModel.GenerateProjection(info.Value, years, info);
		}



	}
}
