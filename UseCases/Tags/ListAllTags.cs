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

namespace UseCases.Tags
{
	public class ListAllTags
	{
		public class Query : IRequest<Result<List<TagDto>>>
		{
			// public int TagId { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<List<TagDto>>>
		{
			private readonly AppDataContext _context;
			private readonly ILogger<ListAllTags> _logger;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, ILogger<ListAllTags> logger, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_logger = logger; ;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<List<TagDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var tag1List = await _context.Tag1s
					.OrderBy(x => x.TagName)
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				var tag2List = await _context.Tag2s
					.OrderBy(x => x.TagName)
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				var tag3List = await _context.Tag3s
					.OrderBy(x => x.TagName)
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				var tag4List = await _context.Tag4s
					.OrderBy(x => x.TagName)
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				var tag5List = await _context.Tag5s
					.OrderBy(x => x.TagName)
					.ProjectTo<TagDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				// concat multiple list of tags to one
				var result = tag1List.Concat(tag2List).Concat(tag3List).Concat(tag4List).Concat(tag5List).ToList();

				if (result != null)
					return Result<List<TagDto>>.Success(result);

				return Result<List<TagDto>>.Success(null);
			}
		}
	}
}
