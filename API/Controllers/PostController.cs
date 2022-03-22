using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Posts;

namespace API.Controllers
{
	public class PostController : BaseApiController
	{
		public IMediator _mediator { get; set; }
		public PostController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpGet]
		public async Task<IActionResult> GetPostList([FromQuery] PostQueryParams param)
		{
			return HandlePagedResult(await Mediator.Send(new List.Query { PostQueryParams = param }));
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetAPost(Guid id)
		{
			return HandleResult(await Mediator.Send(new GetOne.Query { Id = id }));
		}
	}
}
