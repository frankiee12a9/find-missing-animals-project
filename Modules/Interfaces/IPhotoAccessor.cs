using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modules.Photos;

namespace Modules.Interfaces
{
	public interface IPhotoAccessor
	{
		Task<PhotoUploadResults> AddPhoto([FromForm(Name = "File")] IFormFile File);

		Task<string> DeletePhoto(string publicId);
	}
}
