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

namespace UseCases.Posts.Queries
{
	public class ListAllFollowingPosts
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
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.AsQueryable();
                
                result = result.Where(p => p.PostParticipants.Any(x => x.Username == _userAccessor.GetUserName()));   

                // order by filter 
                var orderBy = request.PostQueryParams?.OrderBy;
                if (orderBy != null) 
                    result = result._Sort(orderBy); // search text filter 

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

                return Result<PagedList<PostDto>>.Success(
                    await PagedList<PostDto>.CreateAsync(result, request.PostQueryParams.PageNumber, request.PostQueryParams.PageSize)
                );
			}
		}
	}
}

