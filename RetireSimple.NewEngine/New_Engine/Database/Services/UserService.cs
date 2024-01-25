using Microsoft.Extensions.Options;

using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class UserService  {


		private readonly IMongoCollection<UserInfoModel> _userCollection;

		public UserService() {
			//this._userCollection =base.mongoDatabase.GetCollection<UserInfoModel>(
			//RetireSimpleDatabaseSettings.Value.UsersCollectionName);
			//this._userCollection = base.mongoDatabase.GetCollection<UserInfoModel>("Users");
		}

	
	}
}
