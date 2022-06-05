using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts.Dtos;
using UseCases.Posts.Extensions;

namespace UseCases.Posts
{
	public class EditPost
	{
		public class Command : IRequest<Result<Unit>>
		{
			public EditPostDto Post { get; set; }
			// public EditPostParams EditPostParams { get; set; }
			
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

				// _mapper.Map(request.Post, postToEdit);
				_mapper.Map(request.Post, postToEdit);

				// // var currentPostPhotos = await _context
				// var newPhotosToUpdate = new List<IFormFile>() {request.EditPostParams?.File, request.EditPostParams?.File1, request.EditPostParams?.File2};
				// foreach (var photo in newPhotosToUpdate) 
				// {
				// 	if (photo != null) 
				// 	{
				// 		var photoUpdateResult = await _photoAccessor.AddPhoto(photo);

				// 		if (photoUpdateResult == null)
				// 			return null;
						
				// 		var currentPostPhoto = postToEdit.Photos.Any(p => p.Id );

				// 	}
				// }

				var isEditedOk = await _context.SaveChangesAsync() > 0;
				if (!isEditedOk) return Result<Unit>.Failure("Failed to edit post.");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
