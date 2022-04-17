using System;
using System.Collections.Generic;
using Domain;
using UseCases.Posts;

namespace UseCases.Tags
{
	public class TagDto
	{
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
