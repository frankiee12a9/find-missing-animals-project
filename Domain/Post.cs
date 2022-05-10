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
		[Required]
		public string Content { get; set; }
		public DateTime Date { get; set; } = DateTime.Now;
		public bool IsFound { get; set; } // 찾았나요?

		public ICollection<Tag1Post> Tag1Posts { get; set; }
		public ICollection<Tag2Post> Tag2Posts { get; set; }
		public ICollection<Tag3Post> Tag3Posts { get; set; }
		public ICollection<Tag4Post> Tag4Posts { get; set; }
		public ICollection<Tag5Post> Tag5Posts { get; set; }

		public ICollection<Photo> Photos { get; set; }
		public ICollection<Comment> Comments { get; set; }
		public ICollection<PostFollowing> PostFollowers { get; set; }
		public PostLocation PostLocation { get; set; }
		public Post()
		{
			Tag1Posts = new List<Tag1Post>();
			Tag2Posts = new List<Tag2Post>();
			Tag3Posts = new List<Tag3Post>();
			Tag4Posts = new List<Tag4Post>();
			Tag5Posts = new List<Tag5Post>();
			Photos = new List<Photo>();
			Comments = new List<Comment>();
			PostFollowers = new List<PostFollowing>();
		}
	}
}
