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
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts.Extensions;

namespace UseCases.Posts
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
			private readonly IPhotoAccessor _photoAccessor;

			public Handler(AppDataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
			{
				_userAccessor = userAccessor;
				_context = context;
				_photoAccessor = photoAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var currentUser = await _context.Users
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

				var postOwner = new PostFollowing
				{
					ApplicationUser = currentUser,
					Post = request.NewPostParams.Post,
					isPoster = true
				};
				await _context.PostFollowers.AddAsync(postOwner);

				// Note: tags
				Tag1 tag1 = null;
				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag1))
				{
					tag1 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag1)) || tag.TagName == request.NewPostParams.Tag1);

					if (tag1 == null)
					{
						tag1 = new Tag1
						{
							TagName = request.NewPostParams.Tag1
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

				Tag1 tag2 = null;
				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag2))
				{
					tag2 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag2)) || tag.TagName == request.NewPostParams.Tag2);

					if (tag2 == null)
					{
						tag2 = new Tag1
						{
							TagName = request.NewPostParams.Tag2
						};
						await _context.Tag1s.AddAsync(tag2);
					}
					var Tag1Post = new Tag1Post
					{
						Post = request.NewPostParams.Post,
						Tag1 = tag2
					};
					await _context.Tag1Posts.AddAsync(Tag1Post);
				}

				Tag1 tag3 = null;
				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag3))
				{
					tag3 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag3)) || tag.TagName == request.NewPostParams.Tag3);

					if (tag3 == null)
					{
						tag3 = new Tag1
						{
							TagName = request.NewPostParams.Tag3
						};
						await _context.Tag1s.AddAsync(tag3);
					}
					var Tag3Post = new Tag1Post
					{
						Post = request.NewPostParams.Post,
						Tag1 = tag3
					};
					await _context.Tag1Posts.AddAsync(Tag3Post);
				}

				Tag1 tag4 = null;
				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag4))
				{
					tag4 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag4)) || tag.TagName == request.NewPostParams.Tag4);

					if (tag4 == null)
					{
						tag4 = new Tag1
						{
							TagName = request.NewPostParams.Tag4
						};
						await _context.Tag1s.AddAsync(tag4);
					}
					var Tag4Post = new Tag1Post
					{
						Post = request.NewPostParams.Post,
						Tag1 = tag4
					};
					await _context.Tag1Posts.AddAsync(Tag4Post);
				}

				Tag1 tag5 = null;
				if (!string.IsNullOrEmpty(request.NewPostParams?.Tag5))
				{
					tag5 = await _context.Tag1s
						.FirstOrDefaultAsync(tag =>
						(string.IsNullOrEmpty(request.NewPostParams.Tag5)) || tag.TagName == request.NewPostParams.Tag5);

					if (tag5 == null)
					{
						tag5 = new Tag1
						{
							TagName = request.NewPostParams.Tag4
						};
						await _context.Tag1s.AddAsync(tag5);
					}
					var Tag5Post = new Tag1Post
					{
						Post = request.NewPostParams.Post,
						Tag1 = tag5
					};
					await _context.Tag1Posts.AddAsync(Tag5Post);
				}

				// Note: photos upload
				var photos = request.NewPostParams?.Files;
				if (photos != null) 
				{
					foreach (var file in photos)
					{
						if (file != null)
						{
							var photoToUpload = await _photoAccessor.AddAPhoto(file);
							var newPhoto = new Photo
							{
								Id = photoToUpload.PublicId,
								Url = photoToUpload.Url
							};
							request.NewPostParams.Post.Photos.Add(newPhoto);
						}
					}
				}

				request.NewPostParams.Post.PostFollowers.Add(postOwner);

				_context.Posts.Add(request.NewPostParams.Post);

				var isCreatedOk = await _context.SaveChangesAsync() > 0;
				if (!isCreatedOk) return Result<Unit>.Failure("Failed to create new post.");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
