using System.Collections.Generic;
using Domain;
using Modules.Posts;

namespace Modules.Tags
{
	public class TagDto
	{
		public int Id { get; set; }
		public string TagName { get; set; }
		public ICollection<PostDto> Posts { get; set; }
	}
}
