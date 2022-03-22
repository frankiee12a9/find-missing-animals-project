using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core;
using Modules.Interfaces;
using Persistence;

namespace Modules.Posts
{
    public class GetOne
    {
		public class Query: IRequest<Result<PostDto>>
		{
			public Guid Id { get; set; }
		} 

		public class Handler: IRequestHandler<Query, Result<PostDto>>  
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

			public async Task<Result<PostDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				var result = await _context.Posts
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.FirstOrDefaultAsync(x => x.Id == request.Id);
				
				if (result == null) return null;

				return Result<PostDto>.Success(result);
			}
		}
    }
}
