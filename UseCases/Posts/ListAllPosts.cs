using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts.Extensions;
using UseCases.Tags;

namespace UseCases.Posts
{
	public class ListAllPosts
	{
		public class Query : IRequest<Result<PagedList<PostDto>>>
		{
			public PostQueryParams PostQueryParams { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<PagedList<PostDto>>>
		{
			private readonly AppDataContext _context;
			private readonly ILogger<ListAllPosts> _logger;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, ILogger<ListAllPosts> logger, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_logger = logger; ;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<PagedList<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var result = _context.Posts
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider
						// new { currentUsername = _userAccessor.GetUserName() }
						)
					.AsQueryable();

				Console.WriteLine(result);

				// following posts
				var postFollower = request.PostQueryParams.follower;
				if (postFollower != null) 
					result = result._Following(postFollower);

				// order by filter
				var orderBy = request.PostQueryParams?.OrderBy;
				if (orderBy != null) 
					result = result._Sort(orderBy);

				// search text filter
				var searchText = request.PostQueryParams?.SearchText;
				if (searchText != null)
					result = result._Search(searchText);

				// DateTime query params
				var fromDate = request.PostQueryParams?.FromDate;
				if (fromDate != null) 
					result = result.Where(x => x.CreatedAt >= fromDate);
				
				var toDate = request.PostQueryParams?.ToDate;
				if (toDate != null)
					result = result.Where(x => x.CreatedAt <= toDate);

				// location query params
				string roadLocation = request.PostQueryParams?.RoadLocation; // 도로명 filter
				if (roadLocation != null)
					result = result
						.Where(x => x.PostLocation.RoadLocation.Contains(roadLocation));

				string location = request.PostQueryParams?.Location; // 지번주소 filter
				if (location != null)
					result = result
						.Where(x => x.PostLocation.Location.Contains(location));

				string detailedLocation = request.PostQueryParams?.DetailedLocation; // 상세주소 filter
				if (detailedLocation != null)
					result = result
						.Where(x => x.PostLocation.DetailedLocation.Contains(detailedLocation));

				// tags query params 
				// string tag1 = request.PostQueryParams?.tag1;
				// if (tag1 != null)
				// 	result = result.Where(x => x.Tags.Any(tag => tag.Tag1Name.Contains(tag1)));

				// string tag2 = request.PostQueryParams?.tag2;
				// if (tag2 != null)
				// 	result = result.Where(x => x.Tags.Any(tag => tag.Tag1Name.Contains(tag2)));

				// string tag3 = request.PostQueryParams?.tag3;
				// if (tag3 != null)
				// 	result = result.Where(x => x.Tags.Any(tag => tag.Tag1Name.Contains(tag3)));

				// string tag4 = request.PostQueryParams?.tag4;
				// if (tag4 != null) 
				// 	result = result.Where(x => x.Tags.Any(tag => tag.Tag1Name.Contains(tag4)));

				// string tag5 = request.PostQueryParams?.tag5;
				// if (tag5 != null) 
				// 	result = result.Where(x => x.Tags.Any(tag => tag.Tag1Name.Contains(tag5)));

				return Result<PagedList<PostDto>>.Success(
					await PagedList<PostDto>.CreateAsync(result, request.PostQueryParams.PageNumber,
						request.PostQueryParams.PageSize)
				);
			}
		}
	}
}

