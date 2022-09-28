using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var host = CreateHostBuilder(args).Build();

			using var scope = host.Services.CreateScope();

			var services = scope.ServiceProvider;

			try
			{
				var context = services.GetRequiredService<AppDataContext>(); // add context service

				var userManager = services.GetRequiredService<UserManager<ApplicationUser>>(); // add userManager services

				await context.Database.MigrateAsync();
				// await Seed.SeedDB(context, userManager);
			}
			catch (Exception e)
			{
				var logger = services.GetRequiredService<ILogger<Program>>();
				logger.LogError(e, "An error occurred while creating Db.");
			}

			await host.RunAsync();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});
	}
}
