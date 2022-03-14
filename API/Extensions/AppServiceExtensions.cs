using System.Collections.Generic;
// using Application.Activities;
// using Application.Core;
// using Application.Interfaces;
// using Application.Profiles;
// using Infrastructure.Security;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Modules.Interfaces;
using Persistence;

namespace API.Extensions
{
	// Startup houseKeeping
	public static class AppServiceExtensions
	{
		public static IServiceCollection AddAppServices(this IServiceCollection services,
			IConfiguration configuration)
		{
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
			});

			services.AddDbContext<AppDataContext>(opt =>
			{
				opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
			});

			// configure CORs 1: for calling API from client
			services.AddCors(opt =>
			{
				opt.AddPolicy("CorsPolicy", policy =>
				{
					policy.AllowAnyMethod()
						.AllowAnyHeader()
						.AllowCredentials() // resolve connecting error (CORs policy) of signalR on client 
						.WithOrigins("http://localhost:3000"); // client host 
				});
			});

			// config signalR 1 
			services.AddSignalR(opt =>
			{
				opt.EnableDetailedErrors = true;
			});


			// add mediator
			// services.AddMediatR(typeof(List.Handler).Assembly);

			// autoMapper
			// services.AddAutoMapper(typeof(MappingProfiles).Assembly);

			// to get current logged-in userName in everywhere in application
			services.AddScoped<IUserAccessor, UserAccessor>();

			// scope for photo accessor 
			services.AddScoped<IPhotoAccessor, PhotoAccessor>();

			// log EFCore db config, queries, etc.. 
			services.AddDbContext<AppDataContext>(opt =>
			{
				opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
				opt.UseLoggerFactory(LoggerFactory.Create(builder => { builder.AddConsole(); }));
			});

			// // config for Cloudinary
			services.Configure<CloudinaryConfig>(configuration.GetSection("Cloudinary"));

			return services;
		}
	}
}
