using System;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace API.Extensions
{
	public static class HttpExtensions
	{
		public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage,
			int totalItems, int totalpages)
		{
			var paginationHeader = new
			{
				currentPage,
				itemsPerPage,
				totalItems,
				totalpages
			};

			response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
			response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
		}
	}
}
