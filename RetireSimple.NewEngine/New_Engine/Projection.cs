using System.Collections    ;
namespace RetireSimple.Engine.New_Engine
{
    public class Projection
    {

        public List<double> yearly_projections;
		public readonly int start;
		private int current;

        public Projection(List<double> list, int start) {
			this.yearly_projections = list;
			this.start = start;
			current = 0;
		}

		public Projection Add(Projection other_proj) {
			List<double> list = new List<double>();

			int count;

			if (this.yearly_projections.Count + this.start > other_proj.yearly_projections.Count + other_proj.start) {
				count = this.yearly_projections.Count + this.start;

			} else {
				count = other_proj.yearly_projections.Count + other_proj.start;
			}

			for (int i = 0; i < count; i++) {

				if(i >= this.start && i >= other_proj.start) {
					list.Add(this.GetNext() + other_proj.GetNext());
				}
				else if(i >= this.start && i < other_proj.start) {
					list.Add(this.GetNext());
				}

			}
			this.ResetCount();
			other_proj.ResetCount();
			return new Projection(list, 0);
		}

		public Projection AddExpenses(Projection other_proj) {
			List<double> list = new List<double>();

			list.AddRange(this.yearly_projections);


			double final_val = this.yearly_projections[this.yearly_projections.Count - 1];

			for(int i = 0; i < other_proj.yearly_projections.Count; i++) {
				final_val = final_val - other_proj.yearly_projections[i];
				list.Add(final_val);
				Console.WriteLine(final_val);
			}

			return new Projection(list, 0);

		}

    
	

		public double GetNext() {

			if(this.current >= this.yearly_projections.Count){
				return 0;
			}

			double output = this.yearly_projections[this.current];

			this.current += 1;

			return output;

		}

		public void ResetCount() {
			this.current = 0;
		}
	
	}


    
}