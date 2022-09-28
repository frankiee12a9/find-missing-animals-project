// Note: fix this namespace soon 
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.PostParticipating
{
	public class ToggleFollowing
	{
		public class Command : IRequest<Result<Unit>>
		{
			public Guid PostId { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly IMapper _mapper;
			private readonly AppDataContext _context;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var follower = await _context.Users
					.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUserName());

				if (follower == null) return null;

				var postToFollow = await _context.Posts
					.FirstOrDefaultAsync(post => post.Id == request.PostId);

				// Post to subscribe does not exists
				if (postToFollow == null) return null;

				// Note: FindAsync() accept only the same types
				// ex) (string, string) or (Guid, Guid), etc..
				// var postFollowerId = Guid.Parse(follower.Id);
				// var postFollowing = await _context.PostFollowers.FindAsync(postFollowerId, postToFollow.Id);

				var postFollowing = await _context.PostFollowers
					.AsNoTracking()
					.Where(entity => entity.ApplicationUserId == follower.Id && entity.PostId == postToFollow.Id)
					.FirstOrDefaultAsync();

				if (postFollowing != null)
				{
					_context.PostFollowers.Remove(postFollowing);
				}

				if (postFollowing == null)
				{
					postFollowing = new PostFollowing
					{
						Post = postToFollow,
						ApplicationUser = follower
					};
					_context.PostFollowers.Add(postFollowing);
				}

				var result = await _context.SaveChangesAsync() > 0;

				if (!result) return Result<Unit>.Failure("Failed while following post");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
