using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UseCases.Photos;

namespace UseCases.Interfaces
{
	public interface IPhotoAccessor
	{
		// profile photo as single 
		Task<PhotoUploadResult> AddAPhoto([FromForm(Name = "File")] IFormFile File);
		// post's photos as multiple
		Task<List<PhotoUploadResult>> AddMultiplePhotos([FromForm(Name = "File")] List<IFormFile> FileList);
		Task<string> DeletePhoto(string publicId);
	}
}
