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

namespace UseCases.Tags
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
				var result2 = await _context.Tag2s
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.FirstOrDefaultAsync(tag => tag.TagName == request.TagName);

				if (result2 != null)
					return Result<TagDto>.Success(result2);

				var result3 = await _context.Tag3s
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.FirstOrDefaultAsync(tag => tag.TagName == request.TagName);

				if (result3 != null)
					return Result<TagDto>.Success(result3);

				var result4 = await _context.Tag3s
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.FirstOrDefaultAsync(tag => tag.TagName == request.TagName);

				if (result4 != null)
					return Result<TagDto>.Success(result4);

				return null;
			}
		}
	}
}
