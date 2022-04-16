using System;

namespace Domain
{
	public class Tag3Post
	{
		public Guid PostId { get; set; }
		public Post Post { get; set; }
		public Guid Tag3Id { get; set; }
		public Tag3 Tag3 { get; set; }
	}
}
