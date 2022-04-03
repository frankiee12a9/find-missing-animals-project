using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core;
using Modules.Interfaces;
using Persistence;

namespace Modules.Tags
{
	public class CreateTag
	{
		public class Command : IRequest<Result<Unit>>
		{
			public string TagName { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				// RuleFor(x => x.PostTag.Post).SetValidator(new PostParamsValidator());
				// RuleFor(x => x.NewPostParams.Post).SetValidator(new PostParamsValidator());
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
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

				// Note: limit number of tags <= 5 
				// Note: deleted property
				// var newTag = new Tag
				// {
				// 	TagName = request.TagName
				// };

				// _context.Tags.Add(newTag);

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
