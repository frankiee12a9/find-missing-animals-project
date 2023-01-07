using System.Collections.Generic;

namespace UseCases.Posts.DTOs
{
	public class Tag4Dto
	{
		public string Tag4Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
