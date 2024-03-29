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
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Tags.Queries
{
	public class GetTagsList
	{
		public class Query : IRequest<Result<List<TagDto>>>
		{
		}

        public class Handler : IRequestHandler<Query, Result<List<TagDto>>>
        {
            private readonly AppDataContext _context;
            private readonly ILogger<GetTagsList> _logger;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(AppDataContext context, ILogger<GetTagsList> logger, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _logger = logger; ;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<TagDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Tag1s
                	.OrderBy(x => x.TagName)
                	.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
                	.ToListAsync();

                if (result.Count == 0) return null;

                return Result<List<TagDto>>.Success(result);
            }
        }
    }
}
