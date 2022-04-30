
using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using UseCases.Comments;

namespace API.SignalR
{
	public class CommentHub : Hub
	{
		private readonly IMediator _mediator;

		public CommentHub(IMediator mediator)
		{
			_mediator = mediator;
		}

		public async Task SendComment(CreateComment.Command comment)
		{
			var commentToSend = await _mediator.Send(comment);
			await Clients.Group(comment.PostId.ToString())
				.SendAsync("ReceiveComment", commentToSend.Value);
		}

		public override async Task OnConnectedAsync()
		{
			var httpContext = Context.GetHttpContext();
			var postId = httpContext.Request.Query["postId"];

			await Groups.AddToGroupAsync(Context.ConnectionId, postId);
			var result = await _mediator.Send(new ListAllComments.Query { PostId = Guid.Parse(postId) });

			await Clients.Caller.SendAsync("LoadComments", result.Value);
		}
	}
}
