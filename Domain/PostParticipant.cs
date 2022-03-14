using System;

namespace Domain
{
	public class PostParticipant
	{
		public string ApplicationUserID { get; set; }
		public bool isPoster { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public Post Post { get; set; }
		public Guid PostID { get; set; }
	}
}
