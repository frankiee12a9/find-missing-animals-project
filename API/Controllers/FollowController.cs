using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UseCases.PostParticipating.Commands;

namespace API.Controllers
{
	public class FollowController : BaseApiController
	{
		[HttpPost("{postId}")]
		public async Task<IActionResult> FollowPost(Guid postId)
		{
			return HandleResult(await Mediator.Send(new ToggleFollowing.Command { PostId = postId }));
		}
	}
}
