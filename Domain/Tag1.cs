using System;
using System.Collections.Generic;

namespace Domain
{
	public class Tag1
	{
		// public int Id { get; set; }
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag1Post> Tag1Posts { get; set; }
		public Tag1()
		{
			Tag1Posts = new List<Tag1Post>();
		}
	}
}


