using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;
using RetireSimple.NewEngine.New_Engine.Database.Services;
using RetireSimple.NewEngine.New_Engine.TaxModels;

namespace RetireSimple.NewEngine.New_Engine.Financials {

	public abstract class Financial : DatabaseObject<Info> {

		public readonly string id;

		public readonly FinCategories category;

		public Financial(string id, FinCategories category, Service<Info> service) : base(id, service) {
			this.category = category;
			this.id = id;

		}


		abstract public Task<Projection> Calculate(int years);
	}

}