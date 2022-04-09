using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Posts
{
	public class FollowingPost
	{
		public class Command : IRequest<Result<Unit>>
		{
			public Guid PostId { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly AppDataContext _context;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, IUserAccessor userAccessor)
			{
				_context = context;
				_userAccessor = userAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
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
				{
					post.IsFound = !post.IsFound;
				}
				// un-follwing this post if user is not post owner 
				if (postFollower != null && postOwnerName != currentLoginUser.UserName)
				{
					post.PostFollowers.Remove(postFollower);
				}
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

				return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed while updating attendance.");
			}
		}
	}
}
