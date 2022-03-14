using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
	public class Post
	{
		public Guid Id { get; set; }
		[Required]
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime Date { get; set; }
		// Todo: specify Location vs Address 
		public string Address { get; set; }
		// many-to-many with Photo
		public ICollection<Photo> Photos { get; set; }
		// many-to-many with Comment
		public ICollection<Comment> Comments { get; set; }
		// many-to-many with Tag
		public ICollection<Tag> Tags { get; set; }
		// Many-to-one with Location
		public PetLocation PetLocation { get; set; }
		// many-to-one with Category
		public Category Category { get; set; }
		public Post()
		{
			Photos = new List<Photo>();
			Comments = new List<Comment>();
			Tags = new List<Tag>();
		}
	}
}
