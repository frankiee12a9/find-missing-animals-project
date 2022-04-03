using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Modules.Core;
using Modules.Interfaces;
using Modules.Posts.Extensions;
using Persistence;

namespace Modules.Posts
{
	public class CreatePost
	{
		public class Command : IRequest<Result<Unit>>
		{
			public CreatePostParams NewPostParams { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				RuleFor(x => x.NewPostParams.Post).SetValidator(new PostParamsValidator());
			}
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly AppDataContext _context;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext context, IUserAccessor userAccessor)
			{
				_userAccessor = userAccessor;
				_context = context;
			}

			// Note: still working on this
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var currentUser = await _context.Users
					// .AsNoTracking()
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

				var ownerPost = new PostFollowing
				{
					ApplicationUser = currentUser,
					Post = request.NewPostParams.Post,
					isPoster = true
				};
				await _context.PostFollowers.AddAsync(ownerPost);

				// Note: tags
				Tag1 tag1 = null;
				Tag2 tag2 = null;
				Tag3 tag3 = null;
				Tag4 tag4 = null;
				Tag5 tag5 = null;

				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag1?.TagName))
				{
					tag1 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag1.TagName)) || tag.TagName == request.NewPostParams.Tag1.TagName);

					if (tag1 == null)
					{
						tag1 = new Tag1
						{
							TagName = request.NewPostParams.Tag1.TagName
						};
						await _context.Tag1s.AddAsync(tag1);
					}
					var tag1Post = new Tag1Post
					{
						Post = request.NewPostParams.Post,
						Tag1 = tag1
					};
					await _context.Tag1Posts.AddAsync(tag1Post);
				}

				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag2?.TagName))
				{
					tag2 = await _context.Tag2s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag2.TagName)) || tag.TagName == request.NewPostParams.Tag2.TagName);

					if (tag2 == null)
					{
						tag2 = new Tag2
						{
							TagName = request.NewPostParams.Tag2.TagName
						};
						await _context.Tag2s.AddAsync(tag2);
					}
					var Tag2Post = new Tag2Post
					{
						Post = request.NewPostParams.Post,
						Tag2 = tag2
					};
					await _context.Tag2Posts.AddAsync(Tag2Post);
				}

				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag3?.TagName))
				{
					tag3 = await _context.Tag3s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag3.TagName)) || tag.TagName == request.NewPostParams.Tag3.TagName);

					if (tag3 == null)
					{
						tag3 = new Tag3
						{
							TagName = request.NewPostParams.Tag3.TagName
						};
						await _context.Tag3s.AddAsync(tag3);
					}
					var Tag3Post = new Tag3Post
					{
						Post = request.NewPostParams.Post,
						Tag3 = tag3
					};
					await _context.Tag3Posts.AddAsync(Tag3Post);
				}

				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag4?.TagName))
				{
					tag4 = await _context.Tag4s
									.FirstOrDefaultAsync(tag =>
									(string.IsNullOrEmpty(request.NewPostParams.Tag4.TagName)) || tag.TagName == request.NewPostParams.Tag4.TagName);

					if (tag4 == null)
					{
						tag4 = new Tag4
						{
							TagName = request.NewPostParams.Tag4.TagName
						};
						await _context.Tag4s.AddAsync(tag4);
					}
					var Tag4Post = new Tag4Post
					{
						Post = request.NewPostParams.Post,
						Tag4 = tag4
					};
					await _context.Tag4Posts.AddAsync(Tag4Post);
				}

				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag5?.TagName))
				{
					tag5 = await _context.Tag5s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag5.TagName) || tag.TagName == request.NewPostParams.Tag5.TagName));

					if (tag5 == null)
					{
						tag5 = new Tag5
						{
							TagName = request.NewPostParams.Tag4.TagName
						};
						await _context.Tag5s.AddAsync(tag5);
					}
					var Tag5Post = new Tag5Post
					{
						Post = request.NewPostParams.Post,
						Tag5 = tag5
					};
					await _context.Tag5Posts.AddAsync(Tag5Post);
				}

				request.NewPostParams.Post.PostFollowers.Add(ownerPost);
				_context.Posts.Add(request.NewPostParams.Post);

				var isCreatedOk = await _context.SaveChangesAsync() > 0;
				if (!isCreatedOk)
				{
					return Result<Unit>.Failure("Failed to create new post.");
				}

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
