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


		public Service(IOptions<RetireSimpleDatabaseSettings> RetireSimpleDatabaseSettings) {
			var mongoClient = new MongoClient(
				RetireSimpleDatabaseSettings.Value.ConnectionString);
			this.mongoDatabase = mongoClient.GetDatabase(
				RetireSimpleDatabaseSettings.Value.DatabaseName);
		}


	
		


	}
}
