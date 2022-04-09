using System.Linq;

namespace UseCases.Posts.Extensions
{
	public static class PostExtensions
	{
		public static IQueryable<PostDto> Sort(this IQueryable<PostDto> query, string orderBy)
		{
			// query processing

			return query;
		}

		public static IQueryable<PostDto> Filter(this IQueryable<PostDto> query, string filterOptions)
		{
			// query processing

			return query;
		}

		public static IQueryable<PostDto> Search(this IQueryable<PostDto> query, string searchParams)
		{
			// query processing

			return query;
		}

	}
}
