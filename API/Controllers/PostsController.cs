using System;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UseCases.Posts.Commands;
using UseCases.Posts.Queries;
using UseCases.Posts.DTOs;
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
			return HandlePagedResult(await Mediator.Send(new GetPostsList.Query { PostQueryParams = param }));
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
			Console.Write(createPostParams);
			return HandleResult(await Mediator.Send(new CreatePost.Command { NewPostParams = createPostParams }));
		}

		[Authorize(Policy = "IsPostOwner")]
		[HttpPut("{id}")]
		public async Task<IActionResult> EditPost(Guid id, [FromForm] EditPostDto editPostDto)
		{
			editPostDto.Id = id;
			return HandleResult(await Mediator.Send(new EditPost.Command { Post = editPostDto }));
		}

		[Authorize(Policy = "IsPostOwner")]
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeletePost(Guid id)
		{
			return HandleResult(await Mediator.Send(new DeletePost.Command { Id = id }));
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteAllPosts() 
		{
			return HandleResult(await Mediator.Send(new DeleteAllPosts.Command {}));
		}

		[HttpPost("{postId}/follow")]
		public async Task<IActionResult> FollowPost(Guid postId)
		{
			return HandleResult(await Mediator.Send(new FollowingPost.Command { PostId = postId }));
		}


		[HttpGet("following")]
		public async Task<IActionResult> GetFollowingPostList([FromQuery] PostQueryParams param)
		{
			return HandleResult(await Mediator.Send(new GetFollowingPostsList.Query  { PostQueryParams = param }));
		}
	}
}
