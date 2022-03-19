using System.Collections.Generic;

namespace Domain
{
	public class Tag
	{
		public int Id { get; set; }
		public string TagName { get; set; }
		public ICollection<PostTag> PostTags { get; set; }
		public int CategoryId { get; set; }
		public Category Category { get; set; }
		public Tag()
		{
			PostTags = new List<PostTag>();
		}
	}
}
