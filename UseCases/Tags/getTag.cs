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

namespace Modules.Tags
{
	public class getTag
	{
		public class Query : IRequest<Result<TagDto>>
		{
			public int TagId { get; set; }
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
				// var result = await _context.Tags
				// 	.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
				// 	.FirstOrDefaultAsync(tag => tag.Id == request.TagId);
				// .FindAsync(request.TagId)
				// .(x => x.PostTags)
				// .ThenInclude(p => p.Post)
				// .AsSplitQuery()
				// .ToListAsync()
				;

				// if (result == null) return null;

				// return Result<TagDto>.Success(result);

				return Result<TagDto>.Success(null);
			}
		}
	}
}
