using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Users;

namespace RetireSimple.NewEngine.New_Engine {
	public class NewEngineMain {

		private User user;
		private String userId;
		private UserService userService;
		
		public NewEngineMain(UserService userService) {
			//handle if there is not a user in the system
			
			//hard coded for testing right now
			this.user = new User(userService, "61a6058e6c43f32854e51f51");

		}
	

		public Boolean HandleCreateUser(UserInfo info) {
			this.user.UpdateInfo(info);
			return true;
		}

		public async Task<UserInfoModel> HandleReadUser() {
		
			return await this.user.GetInfo();
		}

		public Boolean HandleUpdateUser(UserInfo info) {
			this.user.UpdateInfo(info);
			return true;
		}


		




	}
}
