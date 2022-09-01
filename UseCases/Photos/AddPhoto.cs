using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;

namespace UseCases.Photos
{
	public class AddPhoto
	{
		public class Command : IRequest<Result<Photo>>
		{
			public IFormFile File { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Photo>>
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

			public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _dbContext.Users
					// .Include(p => p.Photo)
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

				if (user == null) return null;

				var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

				var photo = new Photo
				{
					Url = photoUploadResult.Url,
					Id = photoUploadResult.PublicId
				};

				user.ProfilePictureUrl = photo.Url;

				var result = await _dbContext.SaveChangesAsync() > 0;

				if (result) return Result<Photo>.Success(photo);

				return Result<Photo>.Failure("Failed while adding photo.");
			}
		}
	}
}
