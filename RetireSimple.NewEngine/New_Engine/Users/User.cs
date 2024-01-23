using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;
using RetireSimple.NewEngine.New_Engine.Managers;
using RetireSimple.NewEngine.New_Engine.TaxModels;
using MongoDB.Bson;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using static System.Net.Mime.MediaTypeNames;


namespace RetireSimple.NewEngine.New_Engine.Users {
	public class User {

		private readonly UsersService usersService;

		private ITax tax;

		private UserInfo userInfo;

		private Manager portfolioManager;

		private string id;

		//TODO need to store and retrieve id somehow
		//TODO add id as a part of userinfo maybe
		public User(UsersService _userService, string id) {
			this.id = id;
			this.userInfo = new UserInfo(30, 65, 0, UserTaxStatus.SINGLE);
			this.tax= new NullTax();
			this.portfolioManager = new PortfolioManager();
			this.usersService = _userService;
		}

		private static string CreateId() {
			const string chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			Random random = new Random();

			StringBuilder stringBuilder = new StringBuilder(24);
			for (int i = 0; i < 24; i++) {
				int index = random.Next(chars.Length);
				stringBuilder.Append(chars[index]);
			}

			return stringBuilder.ToString();
		}
		
	
		public void AddTax(ITax tax) {
			this.tax = tax;
		}

		public async void UpdateInfo(UserInfo userInfo) {
			try {
				await this.usersService.UpdateAsync(this.id, userInfo.ConvertToUsers(this.id));
			}
			catch {
				await this.usersService.CreateAsync(userInfo.ConvertToUsers(this.id));
			}
			
		}

		public async Task<UserInfo> GetUserInfo() {
			Database.Models.Users users = await this.usersService.GetAsync(this.id);

			if(users == null) {

				return null;

			} else {
				return new UserInfo(users);
			}
			
		}

		public async Task<Database.Models.Users> GetInfo() {
			return await this.usersService.GetAsync(this.id);
		}

		public Projection GenerateProjections() {

			int years = this.userInfo.retirementAge - this.userInfo.age;

			return this.portfolioManager.Calculate(years);

		}

		public void saveToCSV(Projection proj, String test) {
			//before your loop
			var csv = new StringBuilder();

			//in your loop
			for(int i = 0; i < proj.yearly_projections.Count;i++) {
				var x = (this.userInfo.age + i).ToString();
				var y = proj.yearly_projections[i].ToString();
				//Suggestion made by KyleMit
				var newLine = x + "," + y;// string.Format("{x},{y}", x, y);
				csv.AppendLine(newLine);
			}

			//after your loop
			File.WriteAllText("..\\..\\..\\TestCSV\\" + test + ".csv", csv.ToString());
		}


		public void AddInvestmentVehicle(InvestmentVehicle vehicle) {
			this.portfolioManager.Add(vehicle);
		}

		public double ApplyTax(double income) {

			return this.tax.CalculateTax(income);
		
		}
	






	}
}
