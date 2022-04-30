using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UseCases.Tags;

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
			return HandleResult(await Mediator.Send(new ListAllTags.Query { }));
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public async Task<IActionResult> GetATag(Guid id)
		{
			return HandleResult(await Mediator.Send(new GetTag.Query { TagId = id }));
		}
	}
}
