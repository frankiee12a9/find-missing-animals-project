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

namespace UseCases.Test.Post
{
    public class CreatePostTest: BaseTest
    {
        private readonly IMapper _mapper;  
        public CreatePostTest()
        {
            var mockMapper = new MapperConfiguration(config => { config.AddProfile(new MappingProfiles()); });
            _mapper = mockMapper.CreateMapper();
        }

        [Fact]
        public async Task Should_Create_NewPost() 
        {
            var userAccessor = new Mock<IUserAccessor>();
            var photoAccessor = new Mock<IPhotoAccessor>();
            userAccessor.Setup(user => user.GetUserName()).Returns("test");

            var dbContext = GetAppDataContext();

            await dbContext.Users.AddAsync(
                new ApplicationUser
                {
                    Id = "test_user_id", 
                    Email = "test@test.com",
                    UserName = "test_username"
                }
            );
            await dbContext.SaveChangesAsync();

            var addPostCommand = new CreatePost.Command
            {
                NewPostParams = new CreatePostParams
                {
                    Post = new Domain.Post
                    {
                        Title = "Test_Title", 
                        Content = "Test_Content",
                        PostLocation = new PostLocation
                        {
                            PostCode = "Test_2423",
                            RoadLocation = "Test_RoadLocation",
                            DetailedLocation = "Test_DetailedLocation",
                            ExtraLocation = "Test_ExtraLocation",
                            Location = null,
                            Latitude = null
                        }
                    },
                    Tag1 = new Domain.Tag1 
                    {
                        TagName = "Test_Tag1"
                    },
                    Tag2 = new Domain.Tag1 
                    {
                        TagName = "Test_Tag2"
                    }, 
                    Tag3 = new Domain.Tag1 
                    {
                        TagName = "Test_Tag3"
                    },
                    Tag4 = new Domain.Tag1 
                    {
                        TagName = "Test_Tag4"
                    },
                }
            };

            var sut = new CreatePost.Handler(dbContext, userAccessor.Object, photoAccessor.Object);
            var result = sut.Handle(addPostCommand, CancellationToken.None).Result;

            Assert.NotNull(result);
            // Assert.Equal("Test Post", result.Value);
            // Assert.Equal(1, result.Value);
        }
    }
}