using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine.TaxModels;

namespace RetireSimple.NewEngine.New_Engine.Financials {

	public abstract class Financial {

		public readonly string id;

		public readonly FinCategories category;

		public Financial(string id, FinCategories category) {
			this.category = category;
			this.id = id;

		}


		abstract public Task<Projection> Calculate(int years);
	}

}