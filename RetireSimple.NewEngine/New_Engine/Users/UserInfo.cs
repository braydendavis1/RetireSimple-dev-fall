﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using RetireSimple.NewEngine.New_Engine.Database.Models;


namespace RetireSimple.NewEngine.New_Engine.Users {
	public class UserInfo {


		public int age;

		public int retirementAge;

		public double retirementGoal;

		public UserTaxStatus status;


		public UserInfo(int age, int retirementAge, double retirementGoal, UserTaxStatus status ) {
			this.age = age;
			this.retirementAge = retirementAge;
			this.retirementGoal = retirementGoal;
			this.status = status;
		}

		public UserInfo(Database.Models.Users users) {
			this.age = users.Age;
			this.retirementAge= users.RetirementAge;
			this.retirementGoal = users.RetirementGoal;
			this.status = StringToStatus(users.FilingStatus);
		}

		public static UserTaxStatus StringToStatus(String status) {
			if (status.Equals("SINGLE")) {
				return UserTaxStatus.SINGLE;
			}
			else if (status.Equals("MARRIED_FILING_JOINTLY")) {
				return UserTaxStatus.MARRIED_FILING_JOINTLY;
			}
			else if (status.Equals("MARRIED_FILING_SEPERATELY")) {
				return UserTaxStatus.MARRIED_FILING_SEPERATELY;
			}
			else if (status.Equals("HEAD_OF_HOUSEHOLD")) {
				return UserTaxStatus.HEAD_OF_HOUSEHOLD;
			}
			return UserTaxStatus.SINGLE;

		}

		public String ToString() {
			return "Age: " + this.age + ", Retirement Age: " + this.retirementAge + ", RetirementGoal: " + this.retirementGoal + ", Filing Status: " + this.status;
		}

		public Database.Models.Users ConvertToUsers(string id) {
			return new Database.Models.Users(id, this.age, this.retirementAge, this.retirementGoal, this.status.ToString());

		}

		
	}
}
