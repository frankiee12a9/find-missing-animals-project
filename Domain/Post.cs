using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
	public class Post
	{
		public Guid Id { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public string Content { get; set; }
		public DateTime Date { get; set; }
		public bool IsFound { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public ICollection<Comment> Comments { get; set; }
		public ICollection<PostTag> PostTags { get; set; }
		public ICollection<PostFollowing> PostFollowers { get; set; }
		// public int PetLocationId { get; set; }
		public PetLocation PetLocation { get; set; }
		public int CategoryId { get; set; }
		public Category Category { get; set; }
		public Post()
		{
			Photos = new List<Photo>();
			Comments = new List<Comment>();
			PostTags = new List<PostTag>();
			PostFollowers = new List<PostFollowing>();
			// ApplicationUsers = new List<ApplicationUser>();
		}
	}
}
