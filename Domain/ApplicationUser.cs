using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
	public class ApplicationUser : IdentityUser
	{
		public string DisplayName { get; set; }
		public string Bio { get; set; }
		public ICollection<PostParticipant> PostParticipants { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public ApplicationUser()
		{
			PostParticipants = new List<PostParticipant>();
			Photos = new List<Photo>();
		}
	}
}
