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
using Persistence;
using UseCases.Posts.Queries;
using UseCases.Tags.Queries;
using UseCases.Posts.Commands;

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

            // config CORS for API call from client
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials() // resolve connecting error (CORS policy) of signalR on client 
                        .WithOrigins("http://localhost:3000"); // client host 
                        // .WithOrigins("http://localhost:3001"); // client host 
                });
            });

            // config signalR 
            services.AddSignalR(opt =>
            {
                opt.EnableDetailedErrors = true;
            });

            // config mediator 
            services.AddMediatR(typeof(GetPostsList.Handler).Assembly);

            services.AddMediatR(typeof(GetTagsList.Handler).Assembly);

            services.AddMediatR(typeof(EditPost.Handler).Assembly);

            services.AddMediatR(typeof(CreatePost.Handler).Assembly);

            // config autoMapper 
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // to get current signed in user name in everywhere in application
            services.AddScoped<IUserAccessor, UserAccessor>();

            // scope photo accessor 
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
