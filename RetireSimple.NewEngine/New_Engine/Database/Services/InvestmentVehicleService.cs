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
	public class InvestmentVehicleService : Service {


		private readonly IMongoCollection<InvestmentVehicleInfoModel> _investmentVehicleCollection;
		

		public InvestmentVehicleService(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) : base(RetireSimpleDatabaseSettings) {
			this._investmentVehicleCollection = base.mongoDatabase.GetCollection<InvestmentVehicleInfoModel>(
				RetireSimpleDatabaseSettings.Value.InvestmentVehiclesCollectionName);
		}

		public async Task<List<InvestmentVehicleInfoModel>> GetAsync() =>
		await _investmentVehicleCollection.Find(_ => true).ToListAsync();

		public async Task<InvestmentVehicleInfoModel?> GetAsync(string id) =>
			await _investmentVehicleCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(InvestmentVehicleInfoModel info) =>
			await _investmentVehicleCollection.InsertOneAsync(info);

		public async Task UpdateAsync(string id, InvestmentVehicleInfoModel info) {
			await _investmentVehicleCollection.ReplaceOneAsync(x => x.Id == id, info);
		}

		public async Task RemoveAsync(string id) =>
			await _investmentVehicleCollection.DeleteOneAsync(x => x.Id == id);
		public override void SetCollection() => throw new NotImplementedException();
	}
}
