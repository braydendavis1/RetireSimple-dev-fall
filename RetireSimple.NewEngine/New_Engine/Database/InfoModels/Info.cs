using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RetireSimple.NewEngine.New_Engine.Database.InfoModels {
	public abstract class Info<T> {


		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? Id { get; set; }



	}
}
