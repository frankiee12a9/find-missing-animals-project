using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UseCases.Tags.Queries;

namespace API.Controllers
{
	public class TagsController : BaseApiController
	{
		public IMediator _mediator { get; set; }

		public TagsController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[AllowAnonymous]
		[HttpGet]
		public async Task<IActionResult> GetAllTags()
		{
			return HandleResult(await Mediator.Send(new GetTagsList.Query { }));
		}

		[AllowAnonymous]
		[HttpGet("{tagName}")]
		public async Task<IActionResult> GetATag(string tagName)
		{
			return HandleResult(await Mediator.Send(new GetTag.Query { TagName = tagName }));
		}
	}
}
