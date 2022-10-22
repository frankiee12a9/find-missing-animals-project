using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Posts.Queries
{
	public class FollowingPost
	{
		public class Command : IRequest<Result<PostDto>>
		{
			public Guid PostId { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<PostDto>>
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

			public async Task<Result<PostDto>> Handle(Command request, CancellationToken cancellationToken)
			{
				var post = await _context.Posts
					.Include(e => e.PostFollowers)
						.ThenInclude(e => e.ApplicationUser)
					.FirstOrDefaultAsync(e => e.Id == request.PostId);

				if (post == null) return null;

				var currentLoginUser = await _context.Users
					.FirstOrDefaultAsync(e => e.UserName == _userAccessor.GetUserName());
				if (currentLoginUser == null) return null;

				var postOwnerName = post.PostFollowers
					.FirstOrDefault(e => e.isPoster)?.ApplicationUser?.UserName;

				var postFollower = post.PostFollowers
					.FirstOrDefault(e => e.ApplicationUser.UserName == currentLoginUser.UserName);

				// block this post, if user is post owner
				if (postFollower != null && postOwnerName == currentLoginUser.UserName)
					post.IsFound = !post.IsFound;

				// un-following this post if user is not post owner 
				if (postFollower != null && postOwnerName != currentLoginUser.UserName)
					post.PostFollowers.Remove(postFollower);

				// start following post
				if (postFollower == null)
				{
					postFollower = new PostFollowing
					{
						Post = post,
						ApplicationUser = currentLoginUser,
						isPoster = false
					};
					_context.PostFollowers.Add(postFollower);
				}

				var result = await _context.SaveChangesAsync() > 0;

				// return currently following post
				// Note: 'Command' but return value 
				// reference: https://event-driven.io/en/can_command_return_a_value/
				var currentFollowingPost = await _context.Posts
					.ProjectTo<PostDto>(_mapper.ConfigurationProvider)
					.FirstOrDefaultAsync(x => x.Id == request.PostId);			

				if (!result && currentFollowingPost == null) return null;

				return Result<PostDto>.Success(currentFollowingPost);
			}
		}
	}
}
