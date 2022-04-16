using System;

namespace Domain
{
	public class Tag1Post
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public Guid Tag1Id { get; set; }
		public Tag1 Tag1 { get; set; }
	}
}
