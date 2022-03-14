using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;

namespace Domain
{
	public class Category
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public ICollection<Tag> Tags { get; set; }
		public ICollection<Post> Posts { get; set; }
		public Category()
		{
			Tags = new List<Tag>();
			Posts = new List<Post>();
		}
	}
}
