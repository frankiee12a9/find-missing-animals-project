using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Comments.Dtos;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Comments
{
	public class CreateComment
	{
		public class Command : IRequest<Result<CommentDto>>
		{
			public string Body { get; set; }
			public Guid PostId { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				RuleFor(x => x.Body).NotEmpty();
			}
		}

		public class Handler : IRequestHandler<Command, Result<CommentDto>>
		{
			public AppDataContext  _context { get; set; }
			private IUserAccessor _userAccessor { get; set; }
			private IMapper _mapper { get; set; }

			public Handler(AppDataContext context, IMapper mapper, IUserAccessor userAccessor)
			{
				_context = context;
				_userAccessor = userAccessor;
				_mapper = mapper;
			}

			public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
			{
				var currentPost = await _context.Posts.FirstOrDefaultAsync(post => post.Id == request.PostId);
				if (currentPost == null) return null;

				var currentUser = await _context.Users.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUserName());
				if (currentUser == null) return null;

				var commentToCreate = new Comment
				{
					ApplicationUser = currentUser,
					Post = currentPost,
					Text = request.Body
				};

				_context.Comments.Add(commentToCreate);

				var isCreatedOk = await _context.SaveChangesAsync() > 0;
				if (isCreatedOk) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(commentToCreate));

				return Result<CommentDto>.Failure("Creating new comment failed.");
			}
		}
	}
}
