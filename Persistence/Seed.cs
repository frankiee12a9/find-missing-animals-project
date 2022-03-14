using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
	public class Seed
	{
		public static async Task SeedDB(AppDataContext context,
		   UserManager<ApplicationUser> userManager)
		{
		}
	}
}
