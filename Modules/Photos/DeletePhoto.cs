using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core;
using Modules.Interfaces;
using Persistence;

namespace Application.Photos
{
	public class DeletePhoto
	{
		public class Command : IRequest<Result<Unit>>
		{
			public string Id { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly AppDataContext _dbContext;
			private readonly IPhotoAccessor _photoAccessor;
			private readonly IUserAccessor _userAccessor;

			public Handler(AppDataContext dbContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
			{
				_dbContext = dbContext;
				_photoAccessor = photoAccessor;
				_userAccessor = userAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _dbContext.Users
					.Include(x => x.Photos)
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

				if (user == null) return null;

				var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

				if (photo == null) return null;

				// if (photo.IsMain) return Result<Unit>.Failure("You can not deleting main photo.");
				var result = await _photoAccessor.DeletePhoto(photo.Id);

				if (result == null) return Result<Unit>.Failure("Failed while deleting photo from Cloudinary");

				user.Photos.Remove(photo);

				var success = await _dbContext.SaveChangesAsync() > 0;

				if (success) return Result<Unit>.Success(Unit.Value);

				return Result<Unit>.Failure("Failed while deleting photo.");
			}
		}
	}
}
