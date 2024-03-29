using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
	public static class IdentityServiceExtensions
	{
		public static IServiceCollection AddIdentityService(this IServiceCollection services,
			IConfiguration config)
		{
			services.AddIdentityCore<ApplicationUser>(opt =>
			{
				opt.Password.RequireNonAlphanumeric = false;
			})
			.AddEntityFrameworkStores<AppDataContext>()
			.AddSignInManager<SignInManager<ApplicationUser>>();

			// config signalR without Token
			services.AddSignalR();

			// secret key
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

			// add Jwt bearer for authentication,
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(opt =>
				{
					opt.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = key,
						ValidateIssuer = false,
						ValidateAudience = false,
					};

					// config signalR 
					opt.Events = new JwtBearerEvents
					{
						OnMessageReceived = context =>
						{
							var accessToken = context.Request.Query["access_token"];
							var path = context.HttpContext.Request.Path;

							bool validComment = (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/comment"));
							bool validNotification = (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/notification"));

							if (validComment || validNotification)
							{
								context.Token = accessToken;
							}

							return Task.CompletedTask;
						}
					};
				});

			// only post owner can edit post 
			services.AddAuthorization(opt =>
			{
				opt.AddPolicy("IsPostOwner", policy =>
				{
					policy.Requirements.Add(new IsHostRequirement());
				});
			});

			// REFERENCE: https://stackoverflow.com/questions/38138100/addtransient-addscoped-and-addsingleton-services-differences
			services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
			services.AddScoped<TokenService>();

			return services;
		}
	}
}
