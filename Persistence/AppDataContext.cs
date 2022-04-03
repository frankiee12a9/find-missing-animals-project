using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Internal;

namespace Persistence
{
	public class AppDataContext : IdentityDbContext<ApplicationUser>
	{
		public AppDataContext(DbContextOptions options) : base(options)
		{
			Database.EnsureCreated();
		}

		public DbSet<Post> Posts { get; set; }
		public DbSet<PostFollowing> PostFollowers { get; set; }

		public DbSet<Tag1> Tag1s { get; set; }
		public DbSet<Tag2> Tag2s { get; set; }
		public DbSet<Tag3> Tag3s { get; set; }
		public DbSet<Tag4> Tag4s { get; set; }
		public DbSet<Tag5> Tag5s { get; set; }


		public DbSet<Tag1Post> Tag1Posts { get; set; }
		public DbSet<Tag2Post> Tag2Posts { get; set; }
		public DbSet<Tag3Post> Tag3Posts { get; set; }
		public DbSet<Tag4Post> Tag4Posts { get; set; }
		public DbSet<Tag5Post> Tag5Posts { get; set; }


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

			// config ER for Post-Tag1
			builder.Entity<Tag1Post>(e => e.HasKey(keys => new { keys.PostId, keys.Tag1Id }));

			builder.Entity<Tag1Post>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.Tag1Posts)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<Tag1Post>()
				.HasOne(e => e.Tag1)
				.WithMany(eList => eList.Tag1Posts)
				.HasForeignKey(fk => fk.Tag1Id);

			// config ER for Post-Tag2
			builder.Entity<Tag2Post>(e => e.HasKey(keys => new { keys.PostId, keys.Tag2Id }));

			builder.Entity<Tag2Post>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.Tag2Posts)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<Tag2Post>()
				.HasOne(e => e.Tag2)
				.WithMany(eList => eList.Tag2Posts)
				.HasForeignKey(fk => fk.Tag2Id);

			// config ER for Post-Tag3
			builder.Entity<Tag3Post>(e => e.HasKey(keys => new { keys.PostId, keys.Tag3Id }));

			builder.Entity<Tag3Post>()
				.HasOne(e => e.Post)
				.WithMany(e => e.Tag3Posts)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<Tag3Post>()
				.HasOne(e => e.Tag3)
				.WithMany(e => e.Tag3Posts)
				.HasForeignKey(fk => fk.Tag3Id);

			// config ER for Post-Tag4
			builder.Entity<Tag4Post>(e => e.HasKey(keys => new { keys.PostId, keys.Tag4Id }));

			builder.Entity<Tag4Post>()
				.HasOne(e => e.Post)
				.WithMany(e => e.Tag4Posts)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<Tag4Post>()
				.HasOne(e => e.Tag4)
				.WithMany(e => e.Tag4Posts)
				.HasForeignKey(fk => fk.Tag4Id);

			// config ER for Post-Tag5
			builder.Entity<Tag5Post>(e => e.HasKey(keys => new { keys.PostId, keys.Tag5Id }));

			builder.Entity<Tag5Post>()
				.HasOne(e => e.Post)
				.WithMany(e => e.Tag5Posts)
				.HasForeignKey(fk => fk.PostId);

			builder.Entity<Tag5Post>()
				.HasOne(e => e.Tag5)
				.WithMany(e => e.Tag5Posts)
				.HasForeignKey(fk => fk.Tag5Id);

			// config ER for Post-Comments 
			builder.Entity<Comment>()
				.HasOne(e => e.Post)
				.WithMany(eList => eList.Comments)
				.OnDelete(DeleteBehavior.Cascade);

			// config for Post-Followers
			// builder.Entity<PostFollower>(e =>
			// {
			// 	e.HasKey(keys => new { key.ObserverId, keys.TargetPostId };

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
