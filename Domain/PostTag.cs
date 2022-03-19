using System;

namespace Domain
{
	public class PostTag
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public int TagId { get; set; }
		public Tag Tag { get; set; }
	}
}
