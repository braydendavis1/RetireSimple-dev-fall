using Microsoft.Extensions.Options;

using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;

using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public abstract class Service {

		protected IMongoDatabase mongoDatabase;
		protected IMongoCollection<Info> _collection;


		public Service(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) {
			var mongoClient = new MongoClient(
				RetireSimpleDatabaseSettings.Value.ConnectionString);
			this.mongoDatabase = mongoClient.GetDatabase(
				RetireSimpleDatabaseSettings.Value.DatabaseName);
			SetCollection();

		}



		public abstract void SetCollection();

		public async Task<List<Info>> GetAsync() =>
			await _collection.Find(_ => true).ToListAsync();

		public async Task<Info> GetAsync(string id) =>
			await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(Info info) =>
			await _collection.InsertOneAsync(info);

		public async Task UpdateAsync(string id, Info info) =>
			await _collection.ReplaceOneAsync(x => x.Id == id, info);

		public async Task RemoveAsync(string id) =>
			await _collection.DeleteOneAsync(x => x.Id == id);

		


	}
}
