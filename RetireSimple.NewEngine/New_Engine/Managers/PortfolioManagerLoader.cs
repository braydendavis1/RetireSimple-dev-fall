using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Managers {
	public static class PortfolioManagerLoader {

		public async static Task<PortfolioManager> Load() {
			PortfolioManager portfolioManager = new PortfolioManager();
			await portfolioManager.LoadInvestmentVehicles();
			return portfolioManager;
		}
	}
}
