using System.Collections.Generic;

namespace UseCases.Posts.Dtos
{
	public class Tag3Dto
	{
		public string Tag3Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
