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

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public class PortfolioManager : Manager {


		private List<InvestmentVehicle> investmentVehicles;
		private Service<InvestmentVehicleInfoModel> service;

		public PortfolioManager() {
			this.service = new Service<InvestmentVehicleInfoModel>("InvestmentVehicles", new MongoService<InvestmentVehicleInfoModel>());
		}

		public override bool Add(Financial f) 
		{
			if(f.category == FinCategories.INVESTMENT_VEHICLE) {
				base.items.Add(f);
				return true;
			} 
			else { 
				return false; 
			}


		}

		public override bool DoDelete(int id) {
			base.items.RemoveAt(id);
			return true;
		}
		public override Financial DoRead(int id) {

			return base.items[id];
		}
		public override bool DoUpdate(Financial f, int id) {
			base.items[id] = f;
			return true;
		}


		public async Task<List<InvestmentVehicleInfoModel>> GetInvestmentVehicleInfoModels() {

			return await this.service.HandleGetAsync();
			


		}

		public async Task<InvestmentVehicleInfoModel> GetInvestmentVehicleInfoModel(string id) {

			return await this.service.HandleGetAsync(id);

		}

		public async Task CreateInvestmentVehicle(InvestmentVehicleInfoModel info, string type) {
			if (type.Equals("401k")) {
				_401k vehicle = new _401k(info.Id);
				this.investmentVehicles.Add(vehicle);
				await vehicle.SetInfo(info);
			}

		}

		public async Task UpdateInvestmentVehicle(string id, InvestmentVehicleInfoModel info) {
			await this.service.HandleUpdateAsync(id, info);

		}
	}


}
