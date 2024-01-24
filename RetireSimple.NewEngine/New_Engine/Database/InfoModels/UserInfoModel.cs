using RetireSimple.NewEngine.New_Engine.Users;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels {
	public class UserInfoModel : Info {
		public int Age { get; set; }
		public int RetirementAge { get; set; }
		public double RetirementGoal { get; set; }

		public string FilingStatus { get; set; }
	}
}
