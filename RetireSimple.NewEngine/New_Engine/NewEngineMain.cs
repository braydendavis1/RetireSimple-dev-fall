using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.InvestmentVehicleInfos;
using RetireSimple.NewEngine.New_Engine.Users;

namespace RetireSimple.NewEngine.New_Engine {
	public class NewEngineMain {

		private User user;
		private String userId;

		
		public NewEngineMain() {
			//handle if there is not a user in the system
			
			//hard coded for testing right now
			this.user = new User("61a6058e6c43f32854e51f51");
			
		}
	

		public async Task HandleCreateUser(UserInfoModel info) {
			await this.user.CreateInfo(info);
			
		}

		public async Task<UserInfoModel> HandleReadUser() {
		
			return await this.user.GetInfo();
		}

		public async Task HandleUpdateUser(string id, UserInfoModel info) {
			await this.user.UpdateInfo(id, info);
			
		}

		public async Task HandleCreateInvestmentVehicle(InvestmentVehicleInfoModel vehicle, string type) {
			await this.user.CreateInvestmentVehicle(vehicle, type);
		}

		public async Task<List<InvestmentVehicleInfoModel>> HandleGetInvestmentVehicles() {
			return await this.user.GetInvestmentVehicles();
		}

		public async Task<InvestmentVehicleInfoModel> HandleGetInvestmentVehicle(string id) {
			return await this.user.GetInvestmentVehicle(id);
		}

		public async Task HandleUpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel vehicle) {
			await this.user.UpdateInvestmentVehicle(id, vehicle);
		}

		public async Task HandleDeleteInvestmentVehicle(string id) {
			await this.user.DeleteInvestmentVehicle(id);
		}

		public async Task<ProjectionInfoModel> HandleGetPorfolioProjection() {
			ProjectionInfoModel projection = new ProjectionInfoModel();

			Projection temp = await this.user.GetPortfolioProjection();

			projection.yearly_projections = temp.yearly_projections;

			return projection;
		}

		public async Task<ProjectionInfoModel> HandleGetVehicleProjection(string id) {
			ProjectionInfoModel projection = new ProjectionInfoModel();

			Projection temp = await this.user.GetVehicleProjection(id);

			projection.yearly_projections = temp.yearly_projections;

			return projection;

		}

		public async Task HandleCreateExpense(ExpenseInfoModel info) {
			await this.user.CreateExpense(info);

		}

		public async Task<List<ExpenseInfoModel>> HandleReadAllExpenses() {

			return await this.user.GetAllExpenses();
		}

		public async Task<ExpenseInfoModel> HandleReadExpense(string id) {

			return await this.user.GetExpense(id);
		}

		public async Task HandleUpdateExpense(string id, ExpenseInfoModel info) {
			await this.user.UpdateExpense(id, info);

		}

		public async Task HandleDeleteExpense(string id) {
			await this.user.DeleteExpense(id);
		}

		public async Task HandleCreateInvestment(InvestmentInfoModel info) {
			await this.user.CreateInvestment(info);

		}

		public async Task<List<InvestmentInfoModel>> HandleReadAllInvestments() {

			return await this.user.GetAllInvestments();
		}

		public async Task<InvestmentInfoModel> HandleReadInvestment(string id) {

			return await this.user.GetInvestment(id);
		}

		public async Task HandleUpdateInvestment(string id, InvestmentInfoModel info) {
			await this.user.UpdateInvestment(id, info);

		}

		public async Task HandleDeleteInvestment(string id) {
			await this.user.DeleteInvestment(id);
		}

		public async Task HandleLoadPortfolio() {
			await this.user.LoadPortfolioManager();
		}

	}
}
