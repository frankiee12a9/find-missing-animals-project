using System;
using System.Collections.Generic;

namespace Domain
{
	public class Tag4
	{
		// public int Id { get; set; }
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag4Post> Tag4Posts { get; set; }
		public Tag4()
		{
			Tag4Posts = new List<Tag4Post>();
		}
	}
}
