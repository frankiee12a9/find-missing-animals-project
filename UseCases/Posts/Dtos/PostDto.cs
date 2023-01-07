using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain;
using Microsoft.AspNetCore.Http;
using UseCases.ApplicationUsers.DTOs;
using UseCases.Locations;
using UseCases.Posts.DTOs;
using UseCases.Tags;

namespace UseCases.Posts
{
	public class PostDto
	{
		public Guid Id { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public string Content { get; set; }
		public string PosterName { get; set; }
		public bool IsFound { get; set; }
		public ICollection<PostParticipantDTO> PostParticipants { get; set; }
		[Required]
		public ICollection<Tag1Dto> Tags { get; set; }
		public Tag1Dto Tag1 { get; set; }
		public PostLocationDto PostLocation { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public DateTime CreatedAt { get; set; }
	}
}
