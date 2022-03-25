using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain;
using Modules.AppUsers;
using Modules.Categories;
using Modules.Locations;
using Modules.Tags;

namespace Modules.Posts
{
	public class PostDto
	{
		public Guid Id { get; set; }
		[Required]
		public string Title { get; set; }
		public string Content { get; set; }
		public string PosterName { get; set; }
		public bool IsFound { get; set; }
		public bool IsFollowing { get; set; }
		public ICollection<PostParticipantDto> PostParticipants { get; set; }
		// public ICollection<Tag> Tags { get; set; }
		public PostLocationDto PostLocation { get; set; }
		public ICollection<TagDto> Tags { get; set; }
		public CategoryDto Category { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public DateTime CreatedAt { get; set; } 
		// public Category Category { get; set; }
	}
}
