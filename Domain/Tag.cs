using System.Collections.Generic;

namespace Domain
{
	public class Tag
	{
		public int Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Post> Posts { get; set; }
		// many-to-one with Category
		public Category Category { get; set; }
		public Tag()
		{
			Posts = new List<Post>();
		}
	}
}
