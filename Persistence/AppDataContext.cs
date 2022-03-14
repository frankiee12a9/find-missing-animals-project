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
		public DbSet<PostParticipant> PostParticipants { get; set; }
		// public DbSet<Post> Posts { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			// define relationship for many-to-many entities

		}
	}
}
