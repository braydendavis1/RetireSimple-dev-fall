using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database {
	public abstract class DatabaseObject<T> where T : Info {


		private Service<T> service;
		protected string id;

		public DatabaseObject(string id, Service<T> service){
			this.id = id;
			this.service = service;
			
		}


		public async Task<T> GetInfo() {
			return await this.service.HandleGetAsync(this.id);
		}

		public async Task UpdateInfo(T info) {
			await this.service.HandleUpdateAsync(this.id, info);
		}

		//Create
		public async Task SetInfo(T info) {
			await this.service.HandleCreateAsync(info);
		}

		public string GetId() {
			return this.id;
		}

		public bool Equals(string id) {
			return this.id == id;

		}

	}
}
