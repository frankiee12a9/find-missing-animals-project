using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain;
using Modules.AppUsers.Dtos;
using Modules.Categories;
using Modules.Locations;
using Modules.Posts.Dtos;
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
		public Tag1Dto Tag1Dto { get; set; }
		public Tag2Dto Tag2Dto { get; set; }
		public Tag3Dto Tag3Dto { get; set; }
		public Tag4Dto Tag4Dto { get; set; }
		public Tag5Dto Tag5Dto { get; set; }
		public PostLocationDto PostLocation { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public DateTime CreatedAt { get; set; }
	}
}
