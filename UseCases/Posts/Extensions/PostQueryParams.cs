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
		public string OrderBy { get; set; }
		public string SearchText { get; set; }
		public string follower { get; set; }
		public string tag1 { get; set; }
		public string tag2 { get; set; }
		public string tag3 { get; set; }
		public string tag4 { get; set; }
		public string tag5 { get; set; }
		public DateTime FromDate { get; set; }
		public DateTime ToDate { get; set; } = DateTime.Now;
	}
}
