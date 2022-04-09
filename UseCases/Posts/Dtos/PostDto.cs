using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain;
using Microsoft.AspNetCore.Http;
using UseCases.AppUsers.Dtos;
// using UseCases.Categories;
using UseCases.Locations;
using UseCases.Posts.Dtos;
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
		// public bool IsFollowing { get; set; }
		public ICollection<PostParticipantDto> PostParticipants { get; set; }
		[Required]
		public Tag1Dto Tag1Dto { get; set; }
		[Required]
		public Tag2Dto Tag2Dto { get; set; }
		[Required]
		public Tag3Dto Tag3Dto { get; set; }
		public Tag4Dto Tag4Dto { get; set; }
		public Tag5Dto Tag5Dto { get; set; }
		public PostLocationDto PostLocation { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public DateTime CreatedAt { get; set; }
	}
}
