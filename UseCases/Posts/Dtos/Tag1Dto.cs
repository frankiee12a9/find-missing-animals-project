using System.Collections.Generic;

namespace UseCases.Posts.DTOs
{
	public class Tag1Dto
	{
		public string Tag1Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
