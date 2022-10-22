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
using UseCases.Comments.Dtos;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts;

namespace UseCases.Notifications.Queries
{
    public class ListNotifications
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
			public Guid PostId { get; set; }
			public Guid AppUserId { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
		{
			private AppDataContext _dbContext;
			private IMapper _mapper;
            private IUserAccessor _userAccessor;

			public Handler(AppDataContext dbContext, IMapper mapper, IUserAccessor userAccessor)
			{
				_dbContext = dbContext;
				_mapper = mapper;
                _userAccessor = userAccessor;
			}

			public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var notifications = await _dbContext.Comments
					.Where(comment => comment.Post.Id == request.PostId)
					.OrderBy(comment => comment.Timestamp)
					.ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
					.ToListAsync();
                    
                var followingPosts = _dbContext.Posts
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider,
						new { currentUsername = _userAccessor.GetUserName() })
					.AsQueryable();
                
                followingPosts = followingPosts.Where(p => p.PostParticipants.Any(x => x.Username == _userAccessor.GetUserName()));   

				if (notifications == null) 
				{
					return null;
				}

				return Result<List<CommentDto>>.Success(notifications);
			}
        }
    }
}