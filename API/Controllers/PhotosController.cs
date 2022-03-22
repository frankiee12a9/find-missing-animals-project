using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;
using Modules.Photos;

namespace API.Controllers
{
	public class PhotosController : BaseApiController
	{
		[HttpPost]
		public async Task<IActionResult> Add([FromForm] AddPhoto.Command command)
		{
			return HandleResult(await Mediator.Send(command));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
		}

		[HttpPost("{id}/setMain")]
		public async Task<IActionResult> SetMain(string id)
		{
			return HandleResult(await Mediator.Send(new SetMainPhoto.Command { Id = id }));
		}
	}
}
