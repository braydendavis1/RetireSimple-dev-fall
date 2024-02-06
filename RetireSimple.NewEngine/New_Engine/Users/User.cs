using Microsoft.Extensions.Options;

using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;
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

		public PortfolioManager portfolioManager;

		private Service<UserInfoModel> userService;

		private string id;

		public User(UserInfo userInfo, string id) {

			this.id = id;

			this.tax = new NullTax();

			this.portfolioManager = new PortfolioManager();
			
		}



		public User() {
			this.id = "id here";
			this.tax = new NullTax();
			this.portfolioManager = new PortfolioManager();
		}

		public User( string id) {
			this.userService = new Service<UserInfoModel>("Users", new MongoService<UserInfoModel>());
			this.id = id;
			this.tax = new NullTax();
			this.portfolioManager = new PortfolioManager();

		}

		public async Task LoadPortfolioManager() {
			await this.portfolioManager.LoadInvestmentVehicles();
		}

		
	
		public void AddTax(ITax tax) {
			this.tax = tax;
		}

		public async Task UpdateInfo(string id, UserInfoModel userInfo) {
			await this.userService.HandleUpdateAsync(id, userInfo);
		}

		public async Task<UserInfoModel> GetInfo() {
			return await this.userService.HandleGetAsync(this.id);
		}

		public async Task CreateInfo(UserInfoModel userInfo) {
			await this.userService.HandleCreateAsync(userInfo);
		}


		public async Task<Projection> GenerateProjections() {

			//int years = this.userInfo.retirementAge - this.userInfo.age;

			UserInfoModel userInfo = await GetInfo();

			int years = userInfo.RetirementAge - userInfo.Age;

			return await this.portfolioManager.Calculate(years);

		}

		

		public void AddInvestmentVehicle(InvestmentVehicle vehicle) {
			this.portfolioManager.Add(vehicle);
		}

		public double ApplyTax(double income) {

			return this.tax.CalculateTax(income);
		
		}

		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicles() {
			return await this.portfolioManager.GetInvestmentVehicleInfoModels();
		}

		public async Task CreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			await this.portfolioManager.CreateInvestmentVehicle(info, type);
		}

		public async Task UpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			await this.portfolioManager.UpdateInvestmentVehicle(id, info);
		}
	
		public async Task<InvestmentVehicleInfoModel> GetInvestmentVehicle(string id) {
			return await this.portfolioManager.GetInvestmentVehicleInfoModel(id);
		}

		public async Task DeleleInvestmentVehicle(string id) {
			await this.portfolioManager.DeleteInvestmentVehicleInfoModel(id);
		}

		public async Task<Projection> GetPortfolioProjection(int years) {
			return await this.portfolioManager.Calculate(years);
		}

		public async Task<Projection> GetVehicleProjection(string id, int years) {
			return await this.portfolioManager.GetVehicleProjection( id, years);
		}
	}
}
