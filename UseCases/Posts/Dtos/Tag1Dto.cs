using System.Collections.Generic;

namespace UseCases.Posts.Dtos
{
	public class Tag1Dto
	{
		public string Tag1Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
