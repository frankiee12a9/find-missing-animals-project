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
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		public Post Post { get; set; }
		// [Required]
		public ICollection<IFormFile> Files { get; set; }
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public Tag1 Tag1 { get; set; }
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public Tag2 Tag2 { get; set; }
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		[Required]
		public Tag3 Tag3 { get; set; }
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		public Tag4 Tag4 { get; set; }
		[ModelBinder(BinderType = typeof(JsonModelBinder))]
		public Tag5 Tag5 { get; set; }
	}
}
