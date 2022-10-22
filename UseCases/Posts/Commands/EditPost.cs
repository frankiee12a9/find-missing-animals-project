using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts.Dtos;
using UseCases.Posts.Extensions;

namespace UseCases.Posts.Commands
{
	public class EditPost
	{
		public class Command : IRequest<Result<Unit>>
		{
			public EditPostDto Post { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly IMapper _mapper;
			private readonly AppDataContext _context;
			private readonly IPhotoAccessor _photoAccessor;

			public Handler(AppDataContext context, IMapper mapper, IPhotoAccessor photoAccessor)
			{
				_context = context;
				_mapper = mapper;
				_photoAccessor = photoAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var postToEdit = await _context.Posts
					.Include(p => p.Photos)
					.FirstOrDefaultAsync(x => x.Id == request.Post.Id);
				
				if (postToEdit == null) return null;

				_mapper.Map(request.Post, postToEdit);

				var currentPostPhotos = postToEdit.Photos;
				var newPhotosToUpdate = new List<IFormFile>() {request.Post?.File, request.Post?.File1, request.Post?.File2};

				for (int i = 0 ; i < newPhotosToUpdate.Count; i++) 
				{
					if (newPhotosToUpdate.ElementAt(i) == null) continue;

					var photoUpdateResult = await _photoAccessor.AddPhoto(newPhotosToUpdate.ElementAt(i));

					if (photoUpdateResult == null)
						return null;
					
					if (i < currentPostPhotos.Count && !string.IsNullOrEmpty(currentPostPhotos.ElementAt(i).Id)) 
					{
						await _photoAccessor.DeletePhoto(currentPostPhotos.ElementAt(i).Id);
						var photoToReplace = currentPostPhotos.ElementAt(i); 
						currentPostPhotos.Remove(photoToReplace);
					}
					
					var photoToUpdate = new Photo 
					{
						Id = photoUpdateResult.PublicId,
						Url = photoUpdateResult.Url
					};
					currentPostPhotos.Add(photoToUpdate);
				}

				var result = await _context.SaveChangesAsync() > 0;

				if (!result) 
				{
					return Result<Unit>.Failure("Failed to edit post.");
				}

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
