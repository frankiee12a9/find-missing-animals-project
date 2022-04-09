using System;
using System.Collections.Generic;
using Domain;
using UseCases.Core;

namespace UseCases.Posts.Extensions
{
	public class PostQueryParams : PagingParams
	{
		public bool IsPoster { get; set; } = false;
		public string RoadLocation { get; set; } = null;
		public string DetailedLocation { get; set; } = null;
		public string Location { get; set; } = null;
		public string tag1 { get; set; }
		public string tag2 { get; set; }
		public string tag3 { get; set; }
		public string tag4 { get; set; }
		public string tag5 { get; set; }
		public DateTime StartDate { get; set; } = DateTime.UtcNow;
	}
}
