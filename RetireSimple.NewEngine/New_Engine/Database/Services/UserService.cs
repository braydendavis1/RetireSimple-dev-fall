using Microsoft.Extensions.Options;

using MongoDB.Driver;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.Services {
	public class UserService  : Service<UserInfoModel>  {

		public UserService(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) : base(RetireSimpleDatabaseSettings) {
			 base._collection = base.mongoDatabase.GetCollection<UserInfoModel>(
				RetireSimpleDatabaseSettings.Value.UsersCollectionName);
		
		}

	}
}
