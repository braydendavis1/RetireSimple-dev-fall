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
	public abstract class Service<T> where T : Info {

		protected IMongoDatabase mongoDatabase;
		protected IMongoCollection<T> _collection;

		public Service(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) {
			var mongoClient = new MongoClient(
				RetireSimpleDatabaseSettings.Value.ConnectionString);
			this.mongoDatabase = mongoClient.GetDatabase(
				RetireSimpleDatabaseSettings.Value.DatabaseName);
		
		}


		public async Task<List<T>> GetAsync() =>
			await _collection.Find(_ => true).ToListAsync();

		public async Task<T> GetAsync(string id) =>
			await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(T info) =>
			await _collection.InsertOneAsync(info);

		public async Task UpdateAsync(string id, T info) =>
			await _collection.ReplaceOneAsync(x => x.Id == id, info);

		public async Task RemoveAsync(string id) =>
			await _collection.DeleteOneAsync(x => x.Id == id);

		


	}
}
