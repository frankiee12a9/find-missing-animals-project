using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;

namespace UseCases.Tags.Commands
{
    public class DeleteAllTags
    {
        public class Command : IRequest<Result<Unit>>
		{
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly AppDataContext _context;
			public Handler(AppDataContext context)
			{
				_context = context;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var allTag1s = await _context.Tag1s
                    .ToListAsync();
                    _context.Remove(allTag1s);

				var result = await _context.SaveChangesAsync() > 0;

				if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete activity.");
                }

				return Result<Unit>.Success(Unit.Value);
			}
        }
    }
}