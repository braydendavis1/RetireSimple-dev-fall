using MongoDB.Driver;

using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class MongoService<T> where T : Info{

		public async Task<List<T>> GetAsync(IMongoCollection<T> collection) =>
			await collection.Find(_ => true).ToListAsync();

		public async Task<T?> GetAsync(string id, IMongoCollection<T> collection) =>
			await collection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(T model, IMongoCollection<T> collection) =>
			await collection.InsertOneAsync(model);

		public async Task UpdateAsync(string id, T model, IMongoCollection<T> collection) =>
			await collection.ReplaceOneAsync(x => x.Id == id, model);

		public async Task RemoveAsync(string id, IMongoCollection<T> collection) =>
			await collection.DeleteOneAsync(x => x.Id == id);


		public async Task UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, IMongoCollection<T> collection) =>
			await collection.UpdateOneAsync(filter, update);

	}
}
