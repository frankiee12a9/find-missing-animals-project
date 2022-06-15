using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Comments.Dtos;
using UseCases.Core;

namespace UseCases.Comments
{
	public class ListAllComments
	{
		public class Query : IRequest<Result<List<CommentDto>>>
		{
			public Guid PostId { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
		{
			private AppDataContext _dbContext;
			private IMapper _mapper;

			public Handler(AppDataContext dbContext, IMapper mapper)
			{
				_dbContext = dbContext;
				_mapper = mapper;
			}

			public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var commentList = await _dbContext.Comments
					.Where(comment => comment.Post.Id == request.PostId)
					.OrderBy(comment => comment.Timestamp)
					.ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				if (commentList == null) return null;

				return Result<List<CommentDto>>.Success(commentList);
			}
		}
	}
}
