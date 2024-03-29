using Domain;
using FluentValidation;

namespace UseCases.Posts.Extensions
{
	public class PostParamsValidator : AbstractValidator<Post>
	{
		public PostParamsValidator()
		{
			RuleFor(x => x.Title).NotEmpty();
			RuleFor(x => x.Content).NotEmpty();
			RuleFor(x => x.Date).NotEmpty();
			RuleFor(x => x.PostLocation).NotEmpty();
			RuleFor(x => x.Tag1Posts).NotEmpty(); // Note: be careful this validator
			RuleFor(x => x.Tag2Posts).NotEmpty(); // Note: be careful this validator
		}
	}
}
