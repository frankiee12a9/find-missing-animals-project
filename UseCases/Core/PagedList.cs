using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace UseCases.Core
{
	public class PagedList<T> : List<T>
	{
		public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
		{
			Pagination = new Pagination 
			{
				CurrentPage = pageNumber,
				TotalPages = (int)Math.Ceiling(count / (double)pageSize),
				PageSize = pageSize,
				TotalCount = count,
			};
			AddRange(items);  
		}
		public Pagination Pagination { get; set; }

		public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber,
			int pageSize)
		{
			var count = await source.CountAsync();
			var items = await source.Skip((pageNumber - 1) * pageSize)
									.Take(pageSize)
									.ToListAsync();
			return new PagedList<T>(items, count, pageNumber, pageSize);
		}
	}
}
