using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Modules.Core;
using Modules.Interfaces;
using Modules.Tags;
using Persistence;

namespace Modules.Posts
{
	public class List
	{
		public class Query : IRequest<Result<PagedList<PostDto>>>
		{
			public PostQueryParams PostQueryParams { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<PagedList<PostDto>>>
		{
			private readonly AppDataContext _context;
			private readonly ILogger<List> _logger;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, ILogger<List> logger, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_logger = logger; ;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<PagedList<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var result = _context.Posts
					.Where(x => x.Date >= request.PostQueryParams.StartDate)
					.OrderBy(x => x.Date)
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.AsQueryable();

				_logger.LogInformation($"result {result}");

				string roadLocation = request.PostQueryParams.RoadLocation; // 도로명 filter
				string location = request.PostQueryParams.Location; // 지번주소 filter
				string detailedLocation = request.PostQueryParams.DetailedLocation; // 상세주소 filter

				if (roadLocation != null)
				{
					result = result
						.Where(x => x.PostLocation.RoadLocation.Contains(roadLocation));
					// result = extraResult;
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

				// return paginated result 
				return Result<PagedList<PostDto>>.Success(
					await PagedList<PostDto>.CreateAsync(result, request.PostQueryParams.PageNumber,
					request.PostQueryParams.PageSize)
				);
			}
		}
	}
}

