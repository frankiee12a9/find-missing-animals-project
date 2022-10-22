using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
	// helper method that decide only post owner can edit post
	public class IsHostRequirement : IAuthorizationRequirement
	{

	}

	public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
	{
		private readonly AppDataContext _dbContext;
		private readonly IHttpContextAccessor _contextAccessor;

		public IsHostRequirementHandler(AppDataContext dbContext, IHttpContextAccessor contextAccessor)
		{
			_dbContext = dbContext;
			_contextAccessor = contextAccessor;
		}

		protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
			IsHostRequirement requirement)
		{
			var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

			if (userId == null)
			{
			 	return Task.CompletedTask;
			}

			var currentContextId = _contextAccessor.HttpContext?.Request.RouteValues
				.SingleOrDefault(x => x.Key == "id").Value?.ToString();

			var postId = Guid.Parse(currentContextId);

			var postOwner = _dbContext.PostFollowers
				.AsNoTracking()
				.FirstOrDefault(x => x.ApplicationUserId == userId && x.PostId == postId);

			if (postOwner == null) 
			{
				return Task.CompletedTask;
			}

			if (postOwner.isPoster)
			{
			 	context.Succeed(requirement);
			}

			return Task.CompletedTask;
		}
	}
}
