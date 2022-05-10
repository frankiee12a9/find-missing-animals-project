using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UseCases.Posts;
using UseCases.Posts.Dtos;
using UseCases.Posts.Extensions;

namespace API.Controllers
{
	public class PostsController : BaseApiController
	{
		public IMediator _mediator { get; set; }
		public PostsController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[AllowAnonymous]
		[HttpGet]
		public async Task<IActionResult> GetPostList([FromQuery] PostQueryParams param)
		{
			return HandleResult(await Mediator.Send(new ListAllPosts.Query { PostQueryParams = param }));
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public async Task<IActionResult> GetPost(Guid id)
		{
			return HandleResult(await Mediator.Send(new GetPost.Query { Id = id }));
		}

		[HttpPost]
		public async Task<IActionResult> CreatePost([FromForm] CreatePostParams createPostParams)
		{
			return HandleResult(await Mediator.Send(new CreatePost.Command { NewPostParams = createPostParams }));
		}

		[Authorize(Policy = "IsPostOwner")]
		[HttpPut("{id}")]
		public async Task<IActionResult> EditPost(Guid id, [FromBody] EditPostDto post)
		{
			post.Id = id;
			return HandleResult(await Mediator.Send(new EditPost.Command { Post = post }));
		}

		[Authorize(Policy = "IsPostOwner")]
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeletePost(Guid id)
		{
			return HandleResult(await Mediator.Send(new DeletePost.Command { Id = id }));
		}

		[AllowAnonymous]
		[HttpDelete]
		public async Task<IActionResult> DeletePostList()
		{
			return HandleResult(await Mediator.Send(new DeleteAllPosts.Command {}));
		}

		[HttpPost("{postId}/follow")]
		public async Task<IActionResult> FollowPost(Guid postId)
		{
			return HandleResult(await Mediator.Send(new FollowingPost.Command { PostId = postId }));
		}
	}
}
