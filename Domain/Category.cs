using System.Collections.Generic;

namespace Domain
{
	public class Category
	{
		public int Id { get; set; }
		public string CategoryName { get; set; }
		public ICollection<Tag> Tags { get; set; }
		public ICollection<Post> Posts { get; set; }
		public Category()
		{
			Tags = new List<Tag>();
			Posts = new List<Post>();
		}
	}
}
