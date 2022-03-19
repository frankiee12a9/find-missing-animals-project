using System;
using System.Collections.Generic;

namespace Domain
{
	public class PostFollowing
	{
		public string ApplicationUserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public bool isPoster { get; set; }
		public Guid PostId { get; set; }
		public Post Post { get; set; }
	}
}
