using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Domain
{
	public class ApplicationUser : IdentityUser
	{
		public string DisplayName { get; set; }
		public string Bio { get; set; }
		public ICollection<PostFollowing> PostFollowings { get; set; }
		// public Photo Photo { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public ApplicationUser()
		{
			PostFollowings = new List<PostFollowing>();
			Photos = new List<Photo>();
		}
	}
}


