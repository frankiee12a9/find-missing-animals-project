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
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Tags.Queries
{
	public class GetTag
	{
		public class Query : IRequest<Result<TagDto>>
		{
			public string TagName { get; set; }
		}


        public class Handler : IRequestHandler<Query, Result<TagDto>>
        {
            private readonly AppDataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(AppDataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context; _mapper = mapper; _userAccessor = userAccessor;
            }

            public async Task<Result<TagDto>> Handle(Query request, CancellationToken cancellationToken)
            {
				var result = await _context.Tag1s
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.FirstOrDefaultAsync(tag => tag.TagName == request.TagName);

				if (result == null)
				{
					return null;
				}

				return Result<TagDto>.Success(result);
			}
		}
	}
}
