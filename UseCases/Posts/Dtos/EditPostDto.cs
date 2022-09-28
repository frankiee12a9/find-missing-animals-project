using System;
using System.ComponentModel.DataAnnotations;
using BrunoZell.ModelBinding;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UseCases.Posts.Dtos
{
	public class EditPostDto
	{
		public Guid Id { get; set; }

		[Required]
		public string Title { get; set; }

		[Required]
		public string Content { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		public DateTime UpdatedAt { get; set; } = DateTime.Now;

		public bool IsFound { get; set; } // 찾았나요?
		[Required]
		public string Location { get; set; }
		public string DetailedLocation { get; set; }
		public string RoadLocation { get; set; }
		
		public IFormFile File { get; set; }
		public IFormFile File1 { get; set; }
		public IFormFile File2 { get; set; }

		public string Tag1 { get; set; }
		public string Tag2 { get; set; }
		public string Tag3 { get; set; }
		public string Tag4 { get; set; }
		public string Tag5 { get; set; }
	}
}
