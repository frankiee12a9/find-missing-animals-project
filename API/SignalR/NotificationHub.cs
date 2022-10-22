using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using UseCases.Comments;
using UseCases.Comments.Commands;

namespace API.SignalR
{
    public class NotificationHub: Hub
    {
		private readonly IMediator _mediator;

        public NotificationHub(IMediator mediator)
        {
            _mediator = mediator;
        }   

		public async Task SendComment(CreateComment.Command comment)
		{
			var commentToSend = await _mediator.Send(comment);

			await Clients.Group(comment.PostId.ToString())
				.SendAsync("ReceiveComment", commentToSend.Value);

			await Clients.Group(comment.userToken.ToString())
				.SendAsync("ReceiveNotification", commentToSend.Value);
		}

		public override async Task OnConnectedAsync()
		{
			var httpContext = Context.GetHttpContext();
			var userToken = httpContext.Request.Query["userToken"];

			await Groups.AddToGroupAsync(Context.ConnectionId, userToken);
			await Clients.Caller.SendAsync("LoadNotifications", new List<string> {"foo", "bar", "baz"}); // NOTE: just for a test
		}
    }
}