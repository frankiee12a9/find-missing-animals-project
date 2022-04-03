using System.Collections.Generic;
using Domain;

namespace Modules.Posts.Extensions
{
	public class CreatePostParams
	{
		public Post Post { get; set; }
		public Tag1 Tag1 { get; set; }
		public Tag2 Tag2 { get; set; }
		public Tag3 Tag3 { get; set; }
		public Tag4 Tag4 { get; set; }
		public Tag5 Tag5 { get; set; }
	}
}
