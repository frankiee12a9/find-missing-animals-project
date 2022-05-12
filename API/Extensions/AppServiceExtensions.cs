using System.Collections.Generic;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts;
using Persistence;
using UseCases.Tags;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions
{
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
                opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            });

            // Identity builder
            var builder = services.AddIdentityCore<ApplicationUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<AppDataContext>();
            identityBuilder.AddSignInManager<SignInManager<ApplicationUser>>();

            // services.AddDefaultIdentity<IdentityUser>()
            //     .AddEntityFrameworkStores<AppDbContext>();

            // config CORS for API call from client
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials() // resolve connecting error (CORS policy) of signalR on client 
                        .WithOrigins("http://localhost:3000"); // client host 
                });
            });

            // config signalR 
            services.AddSignalR(opt =>
            {
                opt.EnableDetailedErrors = true;
            });

            // services.AddDefaultIdentity<IdentityUser>()
            //     .AddEntityFrameworkStores<AppDbContext>();

            services.AddMediatR(typeof(ListAllPosts.Handler).Assembly);
            services.AddMediatR(typeof(ListAllTags.Handler).Assembly);

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();

            // log EFCore db config, queries, etc.. 
            services.AddDbContext<AppDataContext>(opt =>
            {
                opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
                opt.UseLoggerFactory(LoggerFactory.Create(builder => { builder.AddConsole(); }));
            });

            // config Cloudinary image upload
            services.Configure<CloudinaryConfig>(configuration.GetSection("Cloudinary"));

            return services;
        }
    }
}
