using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Modules.Core;
using Modules.Posts.Dtos;
using Persistence;

namespace Modules.Posts
{
	public class EditPost
	{
		public class Command : IRequest<Result<Unit>>
		{
			public EditPostDto Post { get; set; }
			// public Guid PostId { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly IMapper _mapper;
			private readonly AppDataContext _context;

			public Handler(AppDataContext context, IMapper mapper)
			{
				_context = context;
				_mapper = mapper;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var postToEdit = await _context.Posts.FindAsync(request.Post.Id);
				if (postToEdit == null) return null;
				_mapper.Map(request.Post, postToEdit);

				var isEditedOk = await _context.SaveChangesAsync() > 0;
				if (!isEditedOk) return Result<Unit>.Failure("Failed to edit post.");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
