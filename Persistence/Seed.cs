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
			IList<Tag1> tag1s = null;
			IList<Tag2> tag2s = null;
			IList<Tag3> tag3s = null;
			IList<Tag4> tag4s = null;
			IList<Tag5> tag5s = null;

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

			if (!context.Tag1s.Any())
			{
				tag1s = new List<Tag1>
				{
					new Tag1
					{
						TagName = "dog"
					}
				};
				await context.Tag1s.AddRangeAsync(tag1s);
				await context.SaveChangesAsync();
			}

			if (!context.Tag2s.Any())
			{
				tag2s = new List<Tag2>
				{
					new Tag2
					{
						TagName = "cat"
					}
				};
				await context.Tag2s.AddRangeAsync(tag2s);
				await context.SaveChangesAsync();
			}

			if (!context.Tag3s.Any())
			{
				tag3s = new List<Tag3>
				{
					new Tag3
					{
						TagName = "chicken"
					}
				};
				await context.Tag3s.AddRangeAsync(tag3s);
				await context.SaveChangesAsync();
			}

			if (!context.Tag4s.Any())
			{
				tag4s = new List<Tag4>
				{
					new Tag4
					{
						TagName = "bird"
					}
				};
				await context.Tag4s.AddRangeAsync(tag4s);
				await context.SaveChangesAsync();
			}

			if (!context.Posts.Any())
			{
				var posts = new List<Post>
				{
					new Post
					{
						Title = "This is post title 1 ",
						Date = DateTime.Now,
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
						Tag1Posts = new List<Tag1Post>
						{
							new Tag1Post
							{
								Tag1 = tag1s?[0]
							},
						},
						Tag2Posts = new List<Tag2Post>
						{
							new Tag2Post
							{
								Tag2 = tag2s?[0]
							}
						},
						Tag3Posts = new List<Tag3Post>
						{
							new Tag3Post
							{
								Tag3 = tag3s?[0]
							}
						},
						Tag4Posts = new List<Tag4Post>
						{
							new Tag4Post
							{
								Tag4 = tag4s?[0]
							}
						},
						// Tag5Posts = new List<Tag5Post>
						// {
						// 	new Tag5Post
						// 	{
						// 		Tag5 = tag5s?[0]
						// 	}
						// },
					},
					new Post
					{
						Title = "This is post title 2",
						Date = DateTime.Now,
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
						Tag1Posts = new List<Tag1Post>
						{
							new Tag1Post
							{
								Tag1 = tag1s?[0]
							},
						},
						Tag2Posts = new List<Tag2Post>
						{
							new Tag2Post
							{
								Tag2 = tag2s?[0]
							}
						},
						Tag3Posts = new List<Tag3Post>
						{
							new Tag3Post
							{
								Tag3 = tag3s?[0]
							}
						},
					},
				};

				await context.Posts.AddRangeAsync(posts);
				await context.SaveChangesAsync();
			}
		}
	}
}
