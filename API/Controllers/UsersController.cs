using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UseCases.ApplicationUsers.Extensions;
using UseCases.ApplicationUsers.Queries;

namespace API.Controllers
{
	public class UsersController : BaseApiController
	{
		public IMediator _mediator { get; set; }

		public UsersController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpGet("{username}")]
		public async Task<IActionResult> GetUser(string username)
		{
			return HandleResult(await Mediator.Send(new GetApplicationUser.Query { Username = username }));
		}

		[HttpGet]
		public async Task<IActionResult> GetUserList([FromQuery] UserQueryParams param)
		{
			return HandlePagedResult(await Mediator.Send(new GetApplicationUsersList.Query { QueryParams = param }));
		}
    }
}
