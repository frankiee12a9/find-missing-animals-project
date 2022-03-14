using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain
{
	public class PetLocation
	{
		public int Id { get; set; }
		public string Location { get; set; }
		public ICollection<Post> Posts { get; set; }
		public PetLocation()
		{
			Posts = new List<Post>();
		}
	}
}
