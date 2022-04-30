using System;
using System.Collections.Generic;

namespace Domain
{
	public class Tag2
	{
		// public int Id { get; set; }
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag2Post> Posts { get; set; }
		public Tag2()
		{
			Posts = new List<Tag2Post>();
		}
	}
}
