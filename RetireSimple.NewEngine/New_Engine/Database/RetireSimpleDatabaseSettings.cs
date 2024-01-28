using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database {
	public class RetireSimpleDatabaseSettings {

		public string ConnectionString { get; set; }

		public string DatabaseName { get; set; } = null!;

		public string UsersCollectionName { get; set; } = null!;
	}
}
