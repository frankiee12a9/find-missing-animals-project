using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.ApplicationUsers.DTOs;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.ApplicationUsers.Queries
{
	public class GetApplicationUser
	{
		public class Query : IRequest<Result<UserProfileDTO>>
		{
			public string Username { get; set; }
		}

        public class Handler : IRequestHandler<Query, Result<UserProfileDTO>>
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

            public async Task<Result<UserProfileDTO>> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users
					.ProjectTo<UserProfileDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(e => e.Username == request.Username);

                if (user == null) return null;

                return Result<UserProfileDTO>.Success(user);
			}
		}
	}
}
