using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;

namespace UseCases.Tags
{
    public class DeleteAllTags
    {
         public class Command : IRequest<Result<Unit>>
		{
			// public Guid Id { get; set; }
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

	            var allTag2s = await _context.Tag2s
                    .ToListAsync();
                _context.Remove(allTag2s);

                var allTag3s = await _context.Tag3s
                    .ToListAsync();
                _context.Remove(allTag3s);

                var allTag4s = await _context.Tag4s
                    .ToListAsync();
                _context.Remove(allTag4s);
                
                var allTag5s = await _context.Tag5s
                    .ToListAsync();
                _context.Remove(allTag5s);

				var result = await _context.SaveChangesAsync() > 0;
				if (!result) return Result<Unit>.Failure("Failed to delete activity.");

				return Result<Unit>.Success(Unit.Value);
			}
        }
    }
}