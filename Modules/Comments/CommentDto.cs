using System;

namespace Modules.Comments
{
	public class CommentDto
	{
		public int Id { get; set; }
		public DateTime Timestamp { get; set; }
		public string Body { get; set; }
		public string Username { get; set; }
		public string DisplayName { get; set; }
		public string ImageUrl { get; set; }
	}
}
