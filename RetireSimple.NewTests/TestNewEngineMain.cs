using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Managers;
using RetireSimple.NewEngine.New_Engine.Users;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewTests {

	[TestClass]
	public class TestNewEngineMain {


		[TestMethod]
		public async Task TestNewEngineMain1Async() {
			NewEngineMain newEngineMain = new NewEngineMain();

			await newEngineMain.HandleLoadPortfolio();

			ProjectionInfoModel projectionInfoModel = await newEngineMain.HandleGetPorfolioProjection();

			Console.WriteLine(projectionInfoModel.yearly_projections);

			Assert.AreEqual(2,projectionInfoModel.yearly_projections.Count);

		}


		[TestMethod]
		public async Task TestUser1Async() {
			User user = new User("61a6058e6c43f32854e51f51");

			await user.portfolioManager.LoadInvestmentVehicles();

			ProjectionInfoModel info = new ProjectionInfoModel();

			Projection projection = await user.GetVehicleProjection("61a6058e6c43f32854e51f57");
		
			info.yearly_projections = projection.yearly_projections;

			Console.WriteLine(info.yearly_projections.Count);

			Assert.AreEqual(2, info.yearly_projections[34]);

		}

		[TestMethod]
		public async Task TestUser2Async() {
			User user = new User("61a6058e6c43f32854e51f51");

			await user.portfolioManager.LoadInvestmentVehicles();

			ProjectionInfoModel info = new ProjectionInfoModel();

			Projection projection = await user.GetPortfolioProjection();

			info.yearly_projections = projection.yearly_projections;

			Console.WriteLine(info.yearly_projections.Count);

			Assert.AreEqual(2, info.yearly_projections[34]);

		}


		[TestMethod]
		public async Task TestPortfolio1Async() {
			/*
			try {
				PortfolioManager portfolio = new PortfolioManager();
				portfolio.LoadInvestmentVehicles();
				ProjectionInfoModel info = new ProjectionInfoModel();

				UserInfoModel userInfo = new UserInfoModel();

				userInfo.Id = "61a6058e6c43f32854e51f51";
				userInfo.Age = 35;
				userInfo.RetirementAge = 69;
				userInfo.RetirementGoal = 100000;
				userInfo.FilingStatus = "Single";

				Projection projection = await portfolio.Calculate(35);

				info.yearly_projections = projection.yearly_projections;

				Console.WriteLine(info.yearly_projections);
				Assert.AreEqual(2, portfolio.investmentVehicles.Count);
			
			}catch (Exception e) {
				Console.WriteLine(e.Message);
				Assert.AreEqual(0, 2);
			}

			*/

			PortfolioManager portfolio = new PortfolioManager();
			await portfolio.LoadInvestmentVehicles();
			ProjectionInfoModel info = new ProjectionInfoModel();

			UserInfoModel userInfo = new UserInfoModel();

			userInfo.Id = "61a6058e6c43f32854e51f51";
			userInfo.Age = 35;
			userInfo.RetirementAge = 69;
			userInfo.RetirementGoal = 100000;
			userInfo.FilingStatus = "Single";

			//Projection projection = await portfolio.Calculate(35);

			//info.yearly_projections = projection.yearly_projections;

			//Console.WriteLine(info.yearly_projections);
			//Assert.AreEqual(2, portfolio.investmentVehicles.Count);



		}

	





	}
}
