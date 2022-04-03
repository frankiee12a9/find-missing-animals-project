using System;

namespace Domain
{
	public class Tag5Post
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public int Tag5Id { get; set; }
		public Tag5 Tag5 { get; set; }
	}
}
