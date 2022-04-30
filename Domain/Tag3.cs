using System;
using System.Collections.Generic;

namespace Domain
{
	public class Tag3
	{
		// public int Id { get; set; }
		public Guid Id { get; set; }
		public string TagName { get; set; }
		public ICollection<Tag3Post> Posts { get; set; }
		public Tag3()
		{
			Posts = new List<Tag3Post>();
		}
	}
}
