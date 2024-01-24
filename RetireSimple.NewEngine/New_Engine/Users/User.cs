using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;
using RetireSimple.NewEngine.New_Engine.GrowthModels._401kGrowthModels;
using RetireSimple.NewEngine.New_Engine.Managers;
using RetireSimple.NewEngine.New_Engine.TaxModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using static System.Net.Mime.MediaTypeNames;

namespace RetireSimple.NewEngine.New_Engine.Users {
	public class User {

		private ITax tax;

		private PortfolioManager portfolioManager;

		private UserService userService;

		private string id;


		public User(UserService userService, InvestmentVehicleService investmentVehicleService,  string id) {
			this.userService = userService;
			this.id = id;
			this.tax = new NullTax();
			this.portfolioManager = new PortfolioManager(investmentVehicleService);


		}

		
	
		public void AddTax(ITax tax) {
			this.tax = tax;
		}

		public async Task UpdateInfo(UserInfoModel userInfo) {
			await this.userService.UpdateAsync(this.id, userInfo);
		}

		public async Task SetInfo(UserInfoModel userInfo) {
			await this.userService.CreateAsync(userInfo);
		}



		public async Task<UserInfoModel> GetInfo() {
			return (UserInfoModel)await this.userService.GetAsync(this.id);
		}


		public async Task<Projection> GenerateProjections() {

			UserInfoModel userInfoModel = await this.GetInfo();

			int years = userInfoModel.RetirementAge - userInfoModel.Age;

			return this.portfolioManager.Calculate(years);

		}
		/*
		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicles() {
			return await this.portfolioManager.GetInvestmentVehicle();
		}
		*/

		public async Task HandleCreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			if (type.Equals("401k")) {
				await this.portfolioManager.CreateNewInvestmentVehicle(info, new _401kGrowth());
			}

	
		}

		public async Task<InvestmentVehicleInfoModel> HandleGetInvestmentVehicle(string id) {
			return await this.portfolioManager.GetInvestmentVehicle(id);
		}

		public async Task HandleUpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			await this.portfolioManager.UpdateInvestmentVehcile(id , info);
		}

		public async Task HandleDeleteInvestmentVehicle(string id) {
			await this.portfolioManager.DeleteInvestmentVehicle(id);
		}


		public double ApplyTax(double income) {

			return this.tax.CalculateTax(income);
		
		}
	






	}
}
