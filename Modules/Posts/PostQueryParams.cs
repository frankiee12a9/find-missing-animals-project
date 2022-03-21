using System;
using Modules.Core;

namespace Modules.Posts
{
	public class PostQueryParams : PagingParams
	{
		public bool IsPoster { get; set; } = false;
		public DateTime StartDate { get; set; } = DateTime.UtcNow;
	}
}
