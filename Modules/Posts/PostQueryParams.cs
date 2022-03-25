using System;
using Modules.Core;

namespace Modules.Posts
{
	public class PostQueryParams : PagingParams
	{
		public bool IsPoster { get; set; } = false;
		public string RoadLocation { get; set; } = null;
		public string DetailedLocation { get; set; } = null;
		public string Location { get; set; } = null;
		public DateTime StartDate { get; set; } = DateTime.UtcNow;
	}
}
