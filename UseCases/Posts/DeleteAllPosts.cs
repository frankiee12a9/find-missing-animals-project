using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using UseCases.Core;

namespace UseCases.Posts
{
    public class DeleteAllPosts
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
				var allPosts = await _context.Posts
                    .Include(photos => photos.Photos)
                    .ToListAsync();

				if (allPosts == null) return null;

				_context.Posts.RemoveRange(allPosts);

				var result = await _context.SaveChangesAsync() > 0;

				if (!result) return Result<Unit>.Failure("Failed to delete activity.");

				return Result<Unit>.Success(Unit.Value);
			}
        }
    }
}