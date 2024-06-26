﻿using RetireSimple.NewEngine.New_Engine.Investments;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RetireSimple.NewEngine.New_Engine.Financials;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._401k;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Financials.Expenses;
using static System.Net.Mime.MediaTypeNames;
using SharpCompress.Common;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.RothIra;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles._457b;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.Cash;
using RetireSimple.NewEngine.New_Engine.Financials.InvestmentVehicles.Pension;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager  {


		public List<InvestmentVehicle> investmentVehicles;
		public List<Investment> investments;
		private Service<InvestmentVehicleInfoModel> service;
		protected Service<InvestmentInfoModel> investmentService;


		public PortfolioManager() {
			this.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>());
			this.investmentService = new Service<InvestmentInfoModel>("Investments", new MongoService<InvestmentInfoModel>());
			this.investmentVehicles = new List<InvestmentVehicle>();
			this.investments = new List<Investment>();

			
		}

		public async Task LoadInvestmentVehicles() {
			List<InvestmentVehicleInfoModel> investmentVehiclesInfo = await this.service.HandleGetAsync();

			this.investmentVehicles = new List<InvestmentVehicle>();
			Console.WriteLine("Loading Vehicles");
			for (int i = 0; i < investmentVehiclesInfo.Count; i++) {
				this.investmentVehicles.Add(InvestmentVehicleLoader.Load(investmentVehiclesInfo[i]));
				
				//Console.WriteLine(i);
			}
		}


		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicleInfoModels() {



			return await this.service.HandleGetAsync();

		}

		public async Task<InvestmentVehicleInfoModel> GetInvestmentVehicleInfoModel(string id) {

			return await this.service.HandleGetAsync(id);

		}

		public async Task CreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			if (type.ToLower().Equals("401k")) {
				_401k vehicle = new _401k(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
				//await vehicle.SetProjectedValue();
			}
			else if (type.ToLower().Equals("rothira")) {
				RothIra vehicle = new RothIra(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			} 
			else if (type.ToLower().Equals("457b")) {
				_457b vehicle = new _457b(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			} 
			else if (type.ToLower().Equals("cash")) {
				Cash vehicle = new Cash(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			} 
			else if (type.ToLower().Equals("pension")) {
				Pension vehicle = new Pension(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			}

		}

		public async Task UpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			await this.service.HandleUpdateAsync(id, info);

		}

		public async Task DeleteInvestmentVehicleInfoModel(string id) {
			int index = -1;
			for(int i = 0; i <  this.investmentVehicles.Count; i++) {
				if (this.investmentVehicles[i].Equals(id)) {
					index = 0;
				}
			}
			if(index != -1) {
				this.investmentVehicles.RemoveAt(index);
			}
			
			await this.service.HandleDeleteAsync(id);
		}

		public async Task<Projection> GetVehicleProjection(string id, int years) {
			int index = -1;
			//await this.LoadInvestmentVehicles();
			for (int i = 0; i < this.investmentVehicles.Count; i++) {
				if (this.investmentVehicles[i].Equals(id)) {
					InvestmentVehicle vehicle = this.investmentVehicles[i];
					
					return await vehicle.Calculate(years);
				}
			}
			return null;
		}

		public async Task<Projection> CalculatePortfolioProjection(int years) {


			//await this.LoadInvestmentVehicles();
			Projection projection = new Projection(new List<double>(), 0);
			for (int i = 0; i < this.investmentVehicles.Count; i++) {
				projection = projection.Add(await this.investmentVehicles[i].Calculate(years));
				Console.WriteLine(this.investmentVehicles[i].GetId());


			}
			return projection;
		}

		public async Task AddExpense(string id, string expenseId) {
			int index = -1;
			Console.WriteLine(this.investmentVehicles.Count);
			for (int i = 0; i < this.investmentVehicles.Count; i++) {
				if (this.investmentVehicles[i].Equals(id)) {
					index = i;
				}
			}
			if (index != -1) {
				Console.WriteLine(index);
				await this.investmentVehicles[index].AddExpense(expenseId);
			}
		}

		public async Task CreateInvestment(InvestmentInfoModel info) {
			Investment investment;
			if (info.investmentType.ToLower().Equals("bond")) {
				investment = new Bond(info.Id, info.investmentName, info.cost, info.bondQuantity);

			} else {
				investment = new Stock(info.Id, info.investmentName, info.currentValue, info.rate);

			}
			this.investments.Add(investment);
			//Console.WriteLine(info.Id);
			await this.investmentService.HandleCreateAsync(info);
		}
		public async Task UpdateInvestment(string id, InvestmentInfoModel info) {
			await this.investmentService.HandleUpdateAsync(id, info);
		}
		public async Task<InvestmentInfoModel> GetInvestment(string id) {
			return await this.investmentService.HandleGetAsync(id);
		}
		public async Task<List<InvestmentInfoModel>> GetAllInvestments() {
			return await this.investmentService.HandleGetAsync();

		}
		public async Task DeleteInvestment(string id) {
			int index = -1;
			for (int i = 0; i < this.investments.Count; i++) {
				if (this.investments[i].Id.Equals(id)) {
					index = i;
				}
			}
			if (index != -1) {
				this.investments.RemoveAt(index);
			}

			await this.investmentService.HandleDeleteAsync(id);
		}
	}




	


}
