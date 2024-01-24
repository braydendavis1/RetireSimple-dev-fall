using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels.InvestmentVehicleInfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.TaxModels;

namespace RetireSimple.NewEngine.New_Engine.Financials {

	public abstract class Financial<T> where T : Info {

		protected string id;

		private readonly Service<T> service;

		public Financial(string id, Service<T> service) {
			this.id = id;
			this.service = service;

		}


		abstract public Projection Calculate(int years);

		public async Task SetInfo(T info) {
			await service.CreateAsync(info);
		}

		public async Task<T> GetInfo() {
			return await service.GetAsync(this.id);
		}

		public async Task UpdateInfo(T info) {
			await service.UpdateAsync(this.id, info);
		}
	}

}