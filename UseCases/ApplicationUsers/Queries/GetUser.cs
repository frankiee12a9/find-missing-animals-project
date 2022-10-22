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
using UseCases.ApplicationUsers.Dtos;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Tags.Queries
{
	public class GetUser
	{
		public class Query : IRequest<Result<UserProfileDto>>
		{
			public string TagName { get; set; }
		}

        public class Handler : IRequestHandler<Query, Result<UserProfileDto>>
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

            public async Task<Result<UserProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
				throw new NotImplementedException();
			}
		}
	}
}
