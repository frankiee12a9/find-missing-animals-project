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

namespace UseCases.Posts.Queries
{
	public class GetPostsList
	{
		public class Query : IRequest<Result<PagedList<PostDto>>>
		{
			public PostQueryParams PostQueryParams { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<PagedList<PostDto>>>
		{
			private readonly AppDataContext _context;
			private readonly ILogger<GetPostsList> _logger;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, ILogger<GetPostsList> logger, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_logger = logger; ;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<PagedList<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var result = _context.Posts
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() }
						)
					.AsQueryable();

				var postFollower = request.PostQueryParams.follower;

				if (postFollower != null) result = result._Following(postFollower);

				var orderBy = request.PostQueryParams?.OrderBy;

				if (orderBy != null) result = result._Sort(orderBy);

				var searchText = request.PostQueryParams?.SearchText;

				if (searchText != null) result = result._Search(searchText);

				var fromDate = request.PostQueryParams?.FromDate;

				if (fromDate != null) result = result.Where(x => x.CreatedAt.Day >= fromDate.Value.Day);
				
				var toDate = request.PostQueryParams?.ToDate;

				if (toDate != null) result = result.Where(x => x.CreatedAt.Day <= toDate.Value.Day);

				string roadLocation = request.PostQueryParams?.RoadLocation; // 도로명 filter

				if (roadLocation != null) result = result.Where(x => x.PostLocation.RoadLocation.Contains(roadLocation));

				string location = request.PostQueryParams?.Location; // 지번주소 filter

				if (location != null) result = result.Where(x => x.PostLocation.Location.Contains(location));

				string detailedLocation = request.PostQueryParams?.DetailedLocation; // 상세주소 filter

				if (detailedLocation != null) result = result.Where(x => x.PostLocation.DetailedLocation.Contains(detailedLocation));

				return Result<PagedList<PostDto>>.Success(
					await PagedList<PostDto>.CreateAsync(result, request.PostQueryParams.PageNumber,
						request.PostQueryParams.PageSize)
				);
			}
		}
	}
}

