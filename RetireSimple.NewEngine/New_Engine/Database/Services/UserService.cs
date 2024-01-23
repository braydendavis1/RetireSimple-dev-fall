using Microsoft.Extensions.Options;

using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class UserService : Service {


		private readonly IMongoCollection<UserInfoModel> _userCollection;

		public UserService(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) : base(RetireSimpleDatabaseSettings) {
			this._userCollection =base.mongoDatabase.GetCollection<UserInfoModel>(
				RetireSimpleDatabaseSettings.Value.UsersCollectionName);
		}

		public async Task<List<UserInfoModel>> GetAsync() =>
		await _userCollection.Find(_ => true).ToListAsync();

		public async Task<UserInfoModel?> GetAsync(string id) =>
			await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(UserInfoModel newUsers) =>
			await _userCollection.InsertOneAsync(newUsers);

		public async Task UpdateAsync(string id, UserInfoModel updatedUsers) =>
			await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUsers);

		public async Task RemoveAsync(string id) =>
			await _userCollection.DeleteOneAsync(x => x.Id == id);

	}
}
