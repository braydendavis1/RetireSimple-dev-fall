using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

using RetireSimple.NewEngine.New_Engine.Users;
using RetireSimple.NewEngine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using MongoDB.Bson;

namespace RetireSimple.NewEngine.New_Engine {
	public class NewEngineMain {

		private User user;
		private string id = "61a6058e6c43f32854e51f51";
		
		public NewEngineMain(UsersService userService) {

			this.user = new User(userService,id );
		
		}
	

		public Boolean HandleCreateUser(UserInfo info) {
			this.user.UpdateInfo(info);
			return true;
		}

		public async Task<Database.Models.Users> HandleReadUser() {
			return await this.user.GetInfo();
		}

		public Boolean HandleUpdateUser(UserInfo info) {

			this.user.UpdateInfo(info);
			return true;
		}


		




	}
}
