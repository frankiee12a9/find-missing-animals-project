using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BrunoZell.ModelBinding;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UseCases.Posts.Extensions
{
	public class CreatePostParams
	{
		// Note: Binding Json object with ModelBinder as JsonModelBinder for request body as form-data
		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		// public Post Post { get; set; }
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public string Location { get; set; }
		public string DetailedLocation { get; set; }

		// [Required]
		// public ICollection<IFormFile> Files { get; set; }

		public IFormFile File { get; set; }
		public IFormFile File1 { get; set; }
		public IFormFile File2 { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public string Tag1 { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public string Tag2 { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public string Tag3 { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		// [Required]
		public string Tag4 { get; set; }

		// [ModelBinder(BinderType = typeof(JsonModelBinder))]
		// [Required]
		public string Tag5 { get; set; }
	}
}
