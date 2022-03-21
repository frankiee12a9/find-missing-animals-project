using System;
using System.Collections.Generic;
using System.Linq;
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
			IList<ApplicationUser> users = null;
			IList<Tag> tags = null;
			IList<Category> categories = null;
			if (!userManager.Users.Any())
			{
				users = new List<ApplicationUser>()
				{
					new ApplicationUser
					{
						DisplayName = "Kane",
						UserName = "kane",
						Email = "kane@test.com"
					},
					new ApplicationUser
					{
						DisplayName = "Jane",
						UserName = "jane",
						Email = "jane@test.com"
					},
					new ApplicationUser
					{
						DisplayName = "Bob",
						UserName = "bob",
						Email = "bob@test.com"
					},
				};

				foreach (var user in users)
				{
					await userManager.CreateAsync(user, "Pa$$w0rd");
				}
			}

			if (!context.Categories.Any())
			{
				categories = new List<Category>
				{
					new Category
					{
						CategoryName = "cat"
					},
					new Category
					{
						CategoryName = "dog"
					},
				};
				await context.Categories.AddRangeAsync(categories);
				await context.SaveChangesAsync();
			}

			if (!context.Tags.Any())
			{
				tags = new List<Tag>
				{
					new Tag
					{
						TagName = "Persian Cat",
						Category = categories?[0],
						PostTags = null
					},
					new Tag
					{
						TagName = "British Cat",
						Category = categories?[0],
						PostTags = null
					},
					new Tag
					{
						TagName = "Scottish Cat",
						Category = categories?[0],
						PostTags = null
					},
					new Tag
					{
						TagName = "Maine Cat",
						Category = categories?[0],
						PostTags = null
					},
					new Tag
					{
						TagName = "Bulldog",
						Category = categories?[1],
						PostTags = null
					},
					new Tag
					{
						TagName = "Poodle",
						Category = categories?[1],
						PostTags = null
					},
					new Tag
					{
						TagName = "Golden Retriever",
						Category = categories?[1],
						PostTags = null
					},
					new Tag
					{
						TagName = "Shiba niu",
						Category = categories?[1],
						PostTags = null
					},
				};

				await context.Tags.AddRangeAsync(tags);
				await context.SaveChangesAsync();
			}

			if (!context.Posts.Any())
			{
				var posts = new List<Post>
				{
					new Post
					{
						Title = "This is post title 1 ",
						Date = DateTime.Now.AddMonths(1),
						Content = "This is post content 1",
						PostLocation = new PostLocation
						{
							PostCode = "13494",
							RoadLocation = "경기 성남시 분당구 판교역 235",
							Location = "경기 성남시 분당구 상평동 681",
							DetailedLocation = "",
							Longitude = 13213.123,
							Latitude = 1232134.11
						},
						PostFollowers = new List<PostFollowing>
						{
							new PostFollowing
							{
								ApplicationUser = users?[0],
								isPoster = true
							},
							new PostFollowing
							{
								ApplicationUser = users?[1],
								isPoster = false
							}
						},
						PostTags = new List<PostTag>
						{
							new PostTag
							{
								Tag = tags?[0]
							},
							new PostTag
							{
								Tag = tags?[1]
							},
						},
						Category = categories?[0]
					},
					new Post
					{
						Title = "This is post title 2",
						Date = DateTime.Now.AddMonths(2),
						Content = "This is post content 1",
						PostLocation = new PostLocation
						{
							PostCode = "01849",
							RoadLocation = "서울 노원구 공릉동 95",
							Location = "서울 노원구 공릉동 661-11",
							DetailedLocation = "자유고시원",
							Longitude = 123213.123,
							Latitude = 2321321.12,
						},
						PostFollowers = new List<PostFollowing>
						{
							new PostFollowing
							{
								ApplicationUser = users?[1],
								isPoster = false
							}
						},
						PostTags = new List<PostTag>
						{
							new PostTag
							{
								Tag = tags?[2]
							},
							new PostTag
							{
								Tag = tags?[3]
							},
						},
						Category = categories?[1]
					},
				};

				await context.Posts.AddRangeAsync(posts);
				await context.SaveChangesAsync();
			}
		}
	}
}
