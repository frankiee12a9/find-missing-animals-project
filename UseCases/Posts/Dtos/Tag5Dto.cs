using System.Collections.Generic;

namespace UseCases.Posts.Dtos
{
	public class Tag5Dto
	{
		public string Tag5Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
