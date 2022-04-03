using System.Collections.Generic;

namespace Domain
{
	public class Tag5
	{
		public int Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag5Post> Tag5Posts { get; set; }
		public Tag5()
		{
			Tag5Posts = new List<Tag5Post>();
		}
	}
}
