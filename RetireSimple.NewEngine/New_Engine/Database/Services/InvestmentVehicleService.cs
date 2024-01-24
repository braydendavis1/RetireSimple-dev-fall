using Microsoft.Extensions.Options;

using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class InvestmentVehicleService : Service<InvestmentVehicleInfoModel> {


		public InvestmentVehicleService(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) : base(RetireSimpleDatabaseSettings) {
			base._collection = base.mongoDatabase.GetCollection<InvestmentVehicleInfoModel>(
				RetireSimpleDatabaseSettings.Value.InvestmentVehiclesCollectionName);
		}
	}
}
