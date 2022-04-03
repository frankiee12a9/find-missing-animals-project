using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Tags;

namespace API.Controllers
{
	public class TagsController : BaseApiController
	{
		public IMediator _mediator { get; set; }
		public TagsController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpGet]
		public async Task<IActionResult> GetPostList()
		{
			return HandleResult(await Mediator.Send(new ListAllTags.Query { }));
		}

		// [HttpPost]
		// public async Task<IActionResult> createTag([FromBody] Tag tag)
		// {
		// 	return HandleResult(await Mediator.Send(new CreateTag.Command { TagName = tag.TagName }));
		// }

		[HttpGet("{id}")]
		public async Task<IActionResult> GetATag(int id)
		{
			return HandleResult(await Mediator.Send(new getTag.Query { TagId = id }));
		}
	}
}
