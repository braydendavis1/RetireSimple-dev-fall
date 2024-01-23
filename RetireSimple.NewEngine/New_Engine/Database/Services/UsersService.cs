using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.Models;


using System.Runtime.CompilerServices;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class UsersService {
		private readonly IMongoCollection<Models.Users> _usersCollection;
	
	

		public UsersService(
			IOptions<Models.RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) {

			var mongoClient = new MongoClient(RetireSimpleDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(RetireSimpleDatabaseSettings.Value.DatabaseName);

			_usersCollection = mongoDatabase.GetCollection<Models.Users>(RetireSimpleDatabaseSettings.Value.UsersCollectionName);
		}

		public async Task<List<Models.Users>> GetAsync() =>
			await _usersCollection.Find(_ => true).ToListAsync();

		public async Task<Models.Users?> GetAsync(string id) =>
			await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(Models.Users newUsers) =>
			await _usersCollection.InsertOneAsync(newUsers);

		public async Task UpdateAsync(string id, Models.Users updatedUsers) =>
			await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUsers);

		public async Task RemoveAsync(string id) =>
			await _usersCollection.DeleteOneAsync(x => x.Id == id);
	}
}
