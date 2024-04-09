using Microsoft.Extensions.Options;

using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;

using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class Service <T> where T : Info {

	
		protected readonly IMongoCollection<T> collection;
		protected MongoService<T> mongoService;

		string conectionString = "mongodb://localhost:27017/";
		string databaseName = "RetireSimple";


		public Service(string collectionName, MongoService<T> mongoService) {
			//var mongoClient = new MongoClient(
			//	RetireSimpleDatabaseSettings.Value.ConnectionString);
			//this.mongoDatabase = mongoClient.GetDatabase(
			//	RetireSimpleDatabaseSettings.Value.DatabaseName);
			var mongoClient = new MongoClient("mongodb://localhost:27017/");
			var mongoDatabase = mongoClient.GetDatabase("RetireSimple");
			this.collection = mongoDatabase.GetCollection<T>(collectionName);
			this.mongoService = mongoService;
			
		}
		public async Task<List<T>> HandleGetAsync() =>
			await this.mongoService.GetAsync(this.collection);
		public async Task<T?> HandleGetAsync(string id) =>
			await this.mongoService.GetAsync(id, this.collection);
		public async Task HandleCreateAsync(T model) =>
			await this.mongoService.CreateAsync(model, this.collection);
		public async Task HandleUpdateAsync(string id, T model) =>
			await this.mongoService.UpdateAsync(id, model, this.collection);
		public async Task HandleDeleteAsync(string id) =>
			await this.mongoService.RemoveAsync(id, this.collection);

		public async Task HandleUpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update) {
			Console.WriteLine(filter.ToString());
			await this.mongoService.UpdateOneAsync(filter, update, this.collection);
		}
			




	}
}
