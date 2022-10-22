using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.ApplicationUsers.Commands
{
	public class UpdateUser
	{
		public class Command : IRequest<Result<Unit>>
		{
			public string TagName { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				throw new NotImplementedException();
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

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				throw new NotImplementedException();
			}
		}
	}
}
