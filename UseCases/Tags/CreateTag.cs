using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Tags
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

				var result = await _context.SaveChangesAsync() > 0;

				if (!result)
					return Result<Unit>.Failure("Failed to create new post.");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
