using System;

namespace Domain
{
	public class Tag2Post
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public string TagName { get; set; }
		public Tag2 Tag2 { get; set; }
	}
}
