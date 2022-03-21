using Domain;
using FluentValidation;

namespace Modules.Posts
{
	public class PostParamsValidator : AbstractValidator<Post>
	{
		public PostParamsValidator()
		{
			RuleFor(x => x.Title).NotEmpty();
			RuleFor(x => x.Content).NotEmpty();
			RuleFor(x => x.Date).NotEmpty();
			RuleFor(x => x.PostTags).NotEmpty();
			RuleFor(x => x.Category).NotEmpty();
		}
	}
}
