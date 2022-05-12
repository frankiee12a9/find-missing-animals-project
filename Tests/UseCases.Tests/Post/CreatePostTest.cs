using System;
using System.Linq;
using System.Threading;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using UseCases.Interfaces;
using Xunit;

namespace UseCases.Tests.Post
{
	public class CreatePostTest : BaseTest
	{
		private readonly IMapper _mapper;

		public CreatePostTest()
		{
			var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfile()); });
			_mapper = mockMapper.CreateMapper();
		}

		[Fact]
		public void Should_Create_New_Post()
		{
			var userAccessor = new Mock<IUserAccessor>();
			userAccessor.Setup(user => user.getCurrentUsername()).Returns("test");

			var context = GetAppDbContext();

			context.Users.AddAsync(new ApplicationUser
			{
				Id = 1,
				Email = "test@test.com",
				Username = "test"
			});
			context.SaveChangesAsync();

			var Post = new CreatePost.Command
			{

			};
		
		}
	}
}
