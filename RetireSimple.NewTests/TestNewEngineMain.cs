using RetireSimple.Engine.New_Engine;
using RetireSimple.NewEngine.New_Engine;
using RetireSimple.NewEngine.New_Engine.Database.InfoModels;

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

			ProjectionInfoModel projectionInfoModel = await newEngineMain.HandleGetPorfolioProjection(10);

			Console.WriteLine(projectionInfoModel.yearly_projections);

			//Assert.AreEqual(projectionInfoModel.yearly_projections, new Projection(new List<double>(), 0));

			


		}
	}
}
