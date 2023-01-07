using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.ApplicationUsers.DTOs;
using UseCases.ApplicationUsers.Extensions;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.ApplicationUsers.Queries
{
	public class GetApplicationUsersList
	{
		public class Query : IRequest<Result<PagedList<UserProfileDTO>>>
		{
            public UserQueryParams QueryParams { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<PagedList<UserProfileDTO>>>
		{
			private readonly AppDataContext _context;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<PagedList<UserProfileDTO>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var userList = _context.Users
					.ProjectTo<UserProfileDTO>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                
				if (userList == null) return null;

                string usernameQueryParam = request.QueryParams.Username;
                string displayNameQueryParam = request.QueryParams.DisplayName;

                if (usernameQueryParam != null) userList = userList.Where(e => e.Username.Contains(usernameQueryParam));

                if (displayNameQueryParam != null) userList = userList.Where(e => e.DisplayName.Contains(displayNameQueryParam));

                return Result<PagedList<UserProfileDTO>>.Success(
					await PagedList<UserProfileDTO>.CreateAsync(userList, request.QueryParams.PageNumber,
						request.QueryParams.PageSize)
				);
			}
		}
	}
}
