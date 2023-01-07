using System.Collections.Generic;

namespace UseCases.Posts.DTOs
{
	public class Tag5Dto
	{
		public string Tag5Name { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
