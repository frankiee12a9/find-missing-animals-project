using System;
using System.Collections.Generic;

namespace Domain
{
	public class Tag1
	{
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag1Post> Posts { get; set; }
		public Tag1()
		{
			Posts = new List<Tag1Post>();
		}
	}
}


