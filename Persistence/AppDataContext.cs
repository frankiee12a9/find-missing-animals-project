using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
	public class AppDataContext : IdentityDbContext<ApplicationUser>
	{
		public AppDataContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<Post> Posts { get; set; }
		public DbSet<PostFollowing> PostFollowers { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Tag> Tags { get; set; }
		public DbSet<Photo> Photos { get; set; }
		public DbSet<Comment> Comments { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// config ER for Posts-Users
			builder.Entity<PostFollowing>(e => e.HasKey(keys => new { keys.PostId, keys.ApplicationUserId }));

			builder.Entity<PostFollowing>()
				.HasOne(e => e.ApplicationUser)
				.WithMany(eList => eList.PostFollowings)
				.HasForeignKey(fk => fk.ApplicationUserId);

			builder.Entity<PostFollowing>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.PostFollowers)
				.HasForeignKey(fk => fk.PostId);

			// config ER for Post-Comments 
			builder.Entity<Comment>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.Comments)
				.OnDelete(DeleteBehavior.Cascade);

			// config ER for Posts-Tags
			builder.Entity<PostTag>(e => e.HasKey(keys => new { keys.PostId, keys.TagId }));

			builder.Entity<PostTag>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.PostTags)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<PostTag>()
				.HasOne(e => e.Tag)
				.WithMany(eList => eList.PostTags)
				.HasForeignKey(fk => fk.TagId);

			// config ER for Category-Tags
			builder.Entity<Tag>()
				.HasOne(e => e.Category)
				.WithMany(eList => eList.Tags)
				.HasForeignKey(fk => fk.CategoryId)
				.OnDelete(DeleteBehavior.Cascade);


			// config for Post-Followers
			// builder.Entity<PostFollower>(e =>
			// {
			// 	e.HasKey(keys => new { keys.ObserverId, keys.TargetPostId });

			// 	e.HasOne(e => e.Observer)
			// 		.WithMany(eList => eList.FollowingPosts)
			// 		.HasForeignKey(fk => fk.ObserverId)
			// 		.OnDelete(DeleteBehavior.Cascade);

			// 	e.HasOne(e => e.TargetPost) 
			// 		.WithMany(eList => eList.)
			// });
		}
	}
}
