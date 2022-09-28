using System;

namespace Domain
{
	public class Tag4Post
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public string TagName { get; set; }
		public Tag4 Tag4 { get; set; }
	}
}
