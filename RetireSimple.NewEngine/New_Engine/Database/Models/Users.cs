﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RetireSimple.NewEngine.New_Engine.Database.Models {

	public class Users {

		// age, retirementAge, retirementGoal, filingStatus
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? Id { get; set; }

		public int Age { get; set; }
		public int RetirementAge { get; set; }
		public double RetirementGoal { get; set; }

		public string FilingStatus { get; set; }


		public Users (string id, int Age, int RetirementAge, double RetirementGoal, string FilingStatus) {
			this.Id = id;
			this.Age = Age;
			this.RetirementAge = RetirementAge;
			this.RetirementGoal = RetirementGoal;
			this.FilingStatus = FilingStatus;
	
		}





	}
}