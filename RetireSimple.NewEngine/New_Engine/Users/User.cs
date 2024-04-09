using Amazon.Runtime.Internal;

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
	public class User : DatabaseObject<UserInfoModel> {

		private ITax tax;

		public PortfolioManager portfolioManager;
		public ExpenseManager expenseManager;

		//private Service<UserInfoModel> userService;

		//private string id;


		public User( string id) : base(id, new Service<UserInfoModel>("Users", new MongoService<UserInfoModel>())) {
			//this.userService = new Service<UserInfoModel>("Users", new MongoService<UserInfoModel>());
			//this.id = id;
			this.tax = new NullTax();
			this.portfolioManager = new PortfolioManager();
			this.expenseManager = new ExpenseManager();


		}

		public async Task LoadPortfolioManager() {
			await this.portfolioManager.LoadInvestmentVehicles();
		}

		public async Task LoadExpenseManager() {
			await this.expenseManager.LoadExpenses();
		}

		
	
		public void AddTax(ITax tax) {
			this.tax = tax;
		}


		/*
		public async Task UpdateInfo(UserInfoModel userInfo) {
			await this.userService.HandleUpdateAsync(this.id, userInfo);
		}

		public async Task<UserInfoModel> GetInfo() {
			return await this.userService.HandleGetAsync(this.id);
		}

		public async Task SetInfo(UserInfoModel userInfo) {
			await this.userService.HandleCreateAsync(userInfo);
		}
		*/
		


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

		public async Task DeleteInvestmentVehicle(string id) {
			await this.portfolioManager.DeleteInvestmentVehicleInfoModel(id);
		}

		public async Task<Projection> GetPortfolioProjection() {
			UserInfoModel userInfo = await GetInfo();

			int work_years = userInfo.RetirementAge - userInfo.Age;

			//goes to 100
			int ret_years = 100 - userInfo.RetirementAge;

			Projection portfolio_projection =  await this.portfolioManager.CalculatePortfolioProjection(work_years);
			Projection expenses_projection = await this.expenseManager.CalculatePortfolioProjection(ret_years);

			return portfolio_projection.AddExpenses(expenses_projection);

		}

		public async Task<Projection> GetVehicleProjection(string id) {

			UserInfoModel userInfo = await GetInfo();
			int years = userInfo.RetirementAge - userInfo.Age;
			return await this.portfolioManager.GetVehicleProjection(id, years);
		}

		public async Task CreateExpense(ExpenseInfoModel info) {
			await this.expenseManager.CreateExpense(info);
		}

		public async Task UpdateExpense(string id, ExpenseInfoModel info) {
			await this.expenseManager.UpdateExpense(id, info);
		}

		public async Task<ExpenseInfoModel> GetExpense(string id) {
			return await this.expenseManager.GetExpenseInfoModel(id);
		}

		public async Task<List<ExpenseInfoModel>> GetAllExpenses() {
			return await this.expenseManager.GetExpenseInfoModels();
		}

		public async Task AddExpenseToInvestmentVehicle(string id, string expenseId) {
			await this.portfolioManager.AddExpense(id, expenseId);
		}

		public async Task DeleteExpense(string id) {
			await this.expenseManager.DeleteExpenseInfoModel(id);
		}

		public async Task CreateInvestment(InvestmentInfoModel info) {
			await this.portfolioManager.CreateInvestment(info);
		}

		public async Task UpdateInvestment(string id, InvestmentInfoModel info) {
			await this.portfolioManager.UpdateInvestment(id, info);
		}

		public async Task<InvestmentInfoModel> GetInvestment(string id) {
			return await this.portfolioManager.GetInvestment(id);
		}

		public async Task<List<InvestmentInfoModel>> GetAllInvestments() {
			return await this.portfolioManager.GetAllInvestments();
		}

		public async Task DeleteInvestment(string id) {
			await this.portfolioManager.DeleteInvestment(id);
		}
	}
}
