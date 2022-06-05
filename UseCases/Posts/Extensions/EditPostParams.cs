using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace UseCases.Posts.Extensions
{
    public class EditPostParams
    {
		public Guid Id { get; set; }
        public string Title { get; set; }
		public string Content { get; set; }
		public string Location { get; set; }
		public string DetailedLocation { get; set; }

		public IFormFile File { get; set; }
		public IFormFile File1 { get; set; }
		public IFormFile File2 { get; set; }

	    // [Required]
		public string Tag1 { get; set; }
		// [Required]
		public string Tag2 { get; set; }
		// [Required]
		public string Tag3 { get; set; }
		public string Tag4 { get; set; }
		public string Tag5 { get; set; }
    }
}