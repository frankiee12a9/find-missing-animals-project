using System;

namespace Domain
{
	public class Comment
	{
		public int ID { get; set; }
		public string Text { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public Post Post { get; set; }
		public DateTime Timestamp { get; set; } = DateTime.UtcNow;
	}
}
