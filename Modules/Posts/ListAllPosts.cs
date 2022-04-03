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
using Modules.Core;
using Modules.Interfaces;
using Modules.Posts.Extensions;
using Modules.Tags;
using Persistence;

namespace Modules.Posts
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
					.OrderBy(x => x.Date)
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.AsQueryable();

				// location query params
				string roadLocation = request.PostQueryParams.RoadLocation; // 도로명 filter
				string location = request.PostQueryParams.Location; // 지번주소 filter
				string detailedLocation = request.PostQueryParams.DetailedLocation; // 상세주소 filter

				if (roadLocation != null)
				{
					result = result
						.Where(x => x.PostLocation.RoadLocation.Contains(roadLocation));
				}

				if (location != null)
				{
					result = result
						.Where(x => x.PostLocation.Location.Contains(location));
				}

				if (detailedLocation != null)
				{
					result = result
						.Where(x => x.PostLocation.DetailedLocation.Contains(detailedLocation));
				}

				// tags query params 
				string tag1 = request.PostQueryParams.tag1;
				string tag2 = request.PostQueryParams.tag2;
				string tag3 = request.PostQueryParams.tag3;
				string tag4 = request.PostQueryParams.tag4;
				string tag5 = request.PostQueryParams.tag5;

				if (tag1 != null)
				{
					result = result.Where(x => x.Tag1Dto.Tag1Name.Contains(tag1));
				}
				if (tag2 != null)
				{
					result = result.Where(x => x.Tag2Dto.Tag2Name.Contains(tag2));
				}
				if (tag3 != null)
				{
					result = result.Where(x => x.Tag3Dto.Tag3Name.Contains(tag3));
				}

				// return paginated result 
				// return Result<List<PostDto>>.Success(
				// 	await result.ToListAsync(cancellationToken)

				return Result<PagedList<PostDto>>.Success(
					await PagedList<PostDto>.CreateAsync(result, request.PostQueryParams.PageNumber,
						request.PostQueryParams.PageSize)
				);
			}
		}
	}
}

