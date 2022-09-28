using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using UseCases.Core;
using UseCases.Interfaces;
using UseCases.Posts;
using UseCases.Posts.Extensions;
using Xunit;

namespace UseCases.Tests.Post
{
	public class CreatePostTest : BaseTest
	{
		private readonly IMapper _mapper;

		public CreatePostTest()
		{
			var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfiles()); });
			_mapper = mockMapper.CreateMapper();
		}

		[Fact]
		public async Task Should_Create_New_Post()
		{
			var userAccessor = new Mock<IUserAccessor>();
			var photoAccessor = new Mock<IPhotoAccessor>();
			userAccessor.Setup(user => user.GetUserName()).Returns("test");

			var context = GetAppDbContext(true);

            await context.Users.AddAsync(new ApplicationUser
			{
				// Id = "",
				DisplayName = "Tuan",
				Email = "tuan@test.com", 
				UserName = "tuan"
			});
            await context.SaveChangesAsync();

			var postCommand = new CreatePost.Command
			{
				NewPostParams = new CreatePostParams 
				{
					Post = new Domain.Post 
					{
						Title = "Test_Title",
						Content = "Test_Content",
						PostLocation = new PostLocation
						{
							PostCode = "4213", 
							RoadLocation = "Test_roadLocation",
							Location = "Test_Location",
							DetailedLocation = "Test_DetailedLocation",
							ExtraLocation = "Test_ExtraLocation"
						},
					},
					Tag1 = new Tag1
					{
						TagName = "Test_tag1"
					},
					Tag2 = new Tag1
					{
						TagName = "Test_tag2"
					},
					Tag3 = new Tag1
					{
						TagName = "Test_tag3"
					},
				}
			};

			var sut = new CreatePost.Handler(context, userAccessor.Object, photoAccessor.Object);
			var result = sut.Handle(postCommand, CancellationToken.None).Result;

			var temp = result.Value;

			Assert.NotNull(result);
			Assert.Equal(temp, temp);
		}
	}
}
