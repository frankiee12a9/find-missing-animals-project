using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UseCases.Interfaces;
using UseCases.Photos;

namespace Infrastructure.Photos
{
	public class PhotoAccessor : IPhotoAccessor
	{
		private readonly Cloudinary _cloudinary;
		private readonly IWebHostEnvironment _env;

		public PhotoAccessor(IOptions<CloudinaryConfig> config, IWebHostEnvironment env)
		{
			var account = new Account(
				config.Value.CloudName,
				config.Value.ApiKey,
				config.Value.ApiSecret
			);
			_env = env;
			_cloudinary = new Cloudinary(account);
		}

		public async Task<PhotoUploadResult> AddAPhoto([FromForm] IFormFile file)
		{
			if (file?.Length > 0)
			{
				await using var stream = file.OpenReadStream();
				var uploadParams = new ImageUploadParams()
				{
					File = new FileDescription(file.FileName, stream),
					Transformation = new Transformation().Height(500).Width(500).Crop("fill") // style image 
				};

				// upload image to Cloudinary 
				var uploadResult = await _cloudinary.UploadAsync(uploadParams);

				if (uploadResult.Error != null)
				{
					throw new Exception(uploadResult.Error.Message);
				}

				return new PhotoUploadResult
				{
					PublicId = uploadResult.PublicId,
					Url = uploadResult.SecureUrl.ToString()
				};
			}

			return null;
		}

		public async Task<List<PhotoUploadResult>> AddMultiplePhotos([FromForm(Name = "File")] List<IFormFile> FileList)
		{
			var result = new List<PhotoUploadResult>();

			foreach (var File in FileList)
			{
				if (File?.Length > 0)
				{
					await using var stream = File.OpenReadStream();
					var uploadParams = new ImageUploadParams()
					{
						File = new FileDescription(File.FileName, stream),
						Transformation = new Transformation().Height(500).Width(500).Crop("fill") // style image 
					};

					// upload image to Cloudinary 
					var uploadResult = await _cloudinary.UploadAsync(uploadParams);

					if (uploadResult.Error != null)
					{
						throw new Exception(uploadResult.Error.Message);
					}

					result.Add(
						new PhotoUploadResult
						{
							PublicId = uploadResult.PublicId,
							Url = uploadResult.SecureUrl.ToString()
						}
					);
				}
			}
			return result;
		}

		public async Task<string> DeletePhoto(string publicId)
		{
			var deleteParams = new DeletionParams(publicId);
			var result = await _cloudinary.DestroyAsync(deleteParams);
			return result.Result == "ok" ? result.Result : null;
		}
	}
}
