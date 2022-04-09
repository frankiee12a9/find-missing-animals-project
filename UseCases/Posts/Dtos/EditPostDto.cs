using System;
using System.ComponentModel.DataAnnotations;
using Domain;

namespace UseCases.Posts.Dtos
{
	public class EditPostDto
	{
		public Guid Id { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public string Content { get; set; }
		public DateTime Date { get; set; }
		public bool IsFound { get; set; } // 찾았나요?
		public PostLocation PostLocation { get; set; }
	}
}
