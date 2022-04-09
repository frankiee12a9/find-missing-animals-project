using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Domain
{
	public class ApplicationUser : IdentityUser
	{
		public string DisplayName { get; set; }
		public string Bio { get; set; }
		public ICollection<PostFollowing> PostFollowings { get; set; }
		public string ProfilePictureUrl { get; set; }
		public ApplicationUser()
		{
			PostFollowings = new List<PostFollowing>();
		}
	}
}


