using System.Collections.Generic;

namespace UseCases.Posts.DTOs
{
	public class Tag2Dto
	{
		public string Tag2Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
