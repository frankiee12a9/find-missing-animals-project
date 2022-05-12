using System.Linq;
using AutoMapper;
using Domain;
using UseCases.AppUsers.Dtos;
using UseCases.Comments.Dtos;
using UseCases.Locations;
using UseCases.Posts;
using UseCases.Posts.Dtos;
using UseCases.Tags;

namespace UseCases.Core
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			string currentUsername = "";

			// CreateMap<Post, PostDto>();

            CreateMap<Tag1, Tag1Dto>()
                .ForMember(dest => dest.Tag1Name, o => o.MapFrom(src => src.TagName))
                .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

            // CreateMap<Tag2, Tag2Dto>()
            //     .ForMember(dest => dest.Tag2Name, o => o.MapFrom(src => src.TagName))
            //     .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			 CreateMap<Tag1, Tag2Dto>()
                .ForMember(dest => dest.Tag2Name, o => o.MapFrom(src => src.TagName))
                .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

            // CreateMap<Tag3, Tag3Dto>()
            //     .ForMember(dest => dest.Tag3Name, o => o.MapFrom(src => src.TagName))
            //     .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag1, Tag3Dto>()
                .ForMember(dest => dest.Tag3Name, o => o.MapFrom(src => src.TagName))
                .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

            // CreateMap<Tag4, Tag4Dto>()
            //     .ForMember(dest => dest.Tag4Name, o => o.MapFrom(src => src.TagName))
            //     .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag1, Tag4Dto>()
                .ForMember(dest => dest.Tag4Name, o => o.MapFrom(src => src.TagName))
                .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

            CreateMap<Tag5, Tag5Dto>()
                .ForMember(dest => dest.Tag5Name, o => o.MapFrom(src => src.TagName));
                // .ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

            // PURPOSE: mapping this way to avoid using .Include() and .ThenInclude() query,
            // that makes query's performance very slow!
            // And by mapping this way, we can perform multiple queries of different DOMAINS in just one method!
            // Ex). Tag1, Tag2, Tag3, Tag4, Tag5 Domains in just one method

            // Note: mapping TagNth -> PostDto (1)
            CreateMap<Tag1, PostDto>()
                .ForMember(dest => dest.Tag1, o => o.MapFrom(src => src.Posts.Select(tag1 => tag1).FirstOrDefault()));
			// CreateMap<Tag1, PostDto>()
            //     .ForMember(dest => dest.Tag2, o => o.MapFrom(src => src.Posts.Select(tag1 => tag1).FirstOrDefault()));
			// CreateMap<Tag1, PostDto>()
            //     .ForMember(dest => dest.Tag3, o => o.MapFrom(src => src.Posts.Select(tag1 => tag1).FirstOrDefault()));
			// CreateMap<Tag1, PostDto>()
            //     .ForMember(dest => dest.Tag4, o => o.MapFrom(src => src.Posts.Select(tag1 => tag1).FirstOrDefault()));
			// CreateMap<Tag1, PostDto>()
            //     .ForMember(dest => dest.Tag5, o => o.MapFrom(src => src.Posts.Select(tag1 => tag1).FirstOrDefault()));

            // CreateMap<Tag2, PostDto>()
			// 	.ForMember(dest => dest.Tag2, o => o.MapFrom(src => src.Posts.Select(tag2 => tag2).FirstOrDefault()));

			// CreateMap<Tag3, PostDto>()
			// 	.ForMember(dest => dest.Tag3, o => o.MapFrom(src => src.Posts.Select(tag3 => tag3).FirstOrDefault()));

			// CreateMap<Tag4, PostDto>()
			// 	.ForMember(dest => dest.Tag4, o => o.MapFrom(src => src.Posts.Select(tag4 => tag4).FirstOrDefault()));

			// CreateMap<Tag5, PostDto>()
			// 	.ForMember(dest => dest.Tag5, o => o.MapFrom(src => src.Tag5Posts.Select(tag5 => tag5).FirstOrDefault()));


            // Note: mapping TagNthPost -> PostDto (2)
            CreateMap<Tag1Post, PostDto>()
                .ForMember(dest => dest.Tag1, o => o.MapFrom(src => src.Tag1))
                .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Post.Id)) // Note: exclude ref post from ref tag when get post(s)
                .ForMember(dest => dest.Title, o => o.MapFrom(src => src.Post.Title))
                .ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.Post.IsFound))
                .ForMember(dest => dest.Content, o => o.MapFrom(src => src.Post.Content))
				.ForMember(dest => dest.PosterName, o => o.MapFrom(src => src.Post.PostFollowers.FirstOrDefault(x => x.isPoster).ApplicationUser.DisplayName))
                .ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Post.Photos))
                .ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.Post.PostLocation))
                .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Post.Date));

            // CreateMap<Tag2Post, PostDto>()
            //     .ForMember(dest => dest.Tag2, o => o.MapFrom(src => src.Tag2));
				// .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Post.Id))
                // .ForMember(dest => dest.Title, o => o.MapFrom(src => src.Post.Title))
                // .ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.Post.IsFound))
                // .ForMember(dest => dest.Content, o => o.MapFrom(src => src.Post.Content))
                // .ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Post.Photos))
                // .ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.Post.PostLocation))
                // .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Post.Date));

            // CreateMap<Tag3Post, PostDto>()
			// 	.ForMember(dest => dest.Tag3, o => o.MapFrom(src => src.Tag3));
				// .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Post.Id))
                // .ForMember(dest => dest.Title, o => o.MapFrom(src => src.Post.Title))
                // .ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.Post.IsFound))
                // .ForMember(dest => dest.Content, o => o.MapFrom(src => src.Post.Content))
                // .ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Post.Photos))
                // .ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.Post.PostLocation))
                // .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Post.Date));

			// CreateMap<Tag4Post, PostDto>()
			// 	.ForMember(dest => dest.Tag4, o => o.MapFrom(src => src.Tag4));
				// .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Post.Id))
                // .ForMember(dest => dest.Title, o => o.MapFrom(src => src.Post.Title))
                // .ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.Post.IsFound))
                // .ForMember(dest => dest.Content, o => o.MapFrom(src => src.Post.Content))
                // .ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Post.Photos))
                // .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Post.Date))
                // .ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.Post.PostLocation));
				
			// CreateMap<Tag5Post, PostDto>()
			// 	.ForMember(dest => dest.Tag5, o => o.MapFrom(src => src.Tag5));
				// .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Post.Id))
                // .ForMember(dest => dest.Title, o => o.MapFrom(src => src.Post.Title))
                // .ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.Post.IsFound))
                // .ForMember(dest => dest.Content, o => o.MapFrom(src => src.Post.Content))
                // .ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Post.Photos))
                // .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Post.Date))
                // .ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.Post.PostLocation));

			CreateMap<Tag1, TagDto>()
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName))
				.ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag2, TagDto>()
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName))
				.ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag3, TagDto>()
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName))
				.ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag4, TagDto>()
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName))
				.ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Posts));

			CreateMap<Tag5, TagDto>()
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName))
				.ForMember(dest => dest.Posts, o => o.MapFrom(src => src.Tag5Posts));

			// Note: mapping PostFollowing - PostParticipant
			CreateMap<PostFollowing, PostParticipantDto>()
				.ForMember(dest => dest.DisplayName, o => o.MapFrom(src => src.ApplicationUser.DisplayName))
				.ForMember(dest => dest.Username, o => o.MapFrom(src => src.ApplicationUser.UserName))
				.ForMember(dest => dest.Image, o => o.MapFrom(src => src.ApplicationUser.ProfilePictureUrl))
				.ForMember(dest => dest.Bio, o => o.MapFrom(src => src.ApplicationUser.Bio));

			CreateMap<PostLocation, PostLocationDto>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.PostCode, o => o.MapFrom(src => src.PostCode))
				.ForMember(dest => dest.RoadLocation, o => o.MapFrom(src => src.RoadLocation))
				.ForMember(dest => dest.Location, o => o.MapFrom(src => src.Location))
				.ForMember(dest => dest.ExtraLocation, o => o.MapFrom(src => src.ExtraLocation))
				.ForMember(dest => dest.Location, o => o.MapFrom(src => src.Location))
				.ForMember(dest => dest.Latitude, o => o.MapFrom(src => src.Latitude));

			CreateMap<Tag1Post, Tag1Dto>()
				.ForMember(dest => dest.Tag1Name, o => o.MapFrom(src => src.Tag1));

			// Note: cyclic mapping for EditPost (1)
			CreateMap<Post, PostDto>()
				.ForMember(dest => dest.PosterName,
				o => o.MapFrom(src => src.PostFollowers.FirstOrDefault(x => x.isPoster).ApplicationUser.DisplayName))
				.ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.PostLocation))
				// .ForMember(dest => dest.Tag1, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).FirstOrDefault()))
				.ForMember(dest => dest.Tags, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).AsQueryable()))
				// .ForMember(dest => dest.Tag2, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ToList().ElementAt(1)))
				// .ForMember(dest => dest.Tag3, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ToList().ElementAt(2)))
				// .ForMember(dest => dest.Tag4, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ToList().ElementAt(3)))
				// .ForMember(dest => dest.Tag5, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ToList().ElementAt(4)))
				// .ForMember(dest => dest.Tags, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ToList().ElementAt(0)))
				// .ForMember(dest => dest.Tag2, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).ElementAt(1)))
				// .ForMember(dest => dest.Tag3, o => o.MapFrom(src => src.Tag1Posts.Select(tag => tag.Tag1).FirstOrDefault()))
				// .ForMember(dest => dest.Tag4, o => o.MapFrom(src => src.Tag4Posts.Select(tag => tag.Tag4).FirstOrDefault()))
				// .ForMember(dest => dest.Tag5, o => o.MapFrom(src => src.Tag5Posts.Select(tag => tag.Tag5).FirstOrDefault()))
				.ForMember(dest => dest.Photos, o => o.MapFrom(src => src.Photos))
				.ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.Date))
				.ForMember(dest => dest.PostParticipants, o => o.MapFrom(src => src.PostFollowers));

			// Note: cyclic mapping for EditPost (2)
			CreateMap<EditPostDto, Post>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, o => o.MapFrom(src => src.Title))
				.ForMember(dest => dest.Content, o => o.MapFrom(src => src.Content))
				.ForMember(dest => dest.Date, o => o.MapFrom(src => src.Date))
				.ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.IsFound))
				.ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.PostLocation));

			CreateMap<Post, EditPostDto>()
				// .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, o => o.MapFrom(src => src.Title))
				.ForMember(dest => dest.Content, o => o.MapFrom(src => src.Content))
				.ForMember(dest => dest.Date, o => o.MapFrom(src => src.Date))
				.ForMember(dest => dest.IsFound, o => o.MapFrom(src => src.IsFound))
				.ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.PostLocation));

			CreateMap<Comment, CommentDto>()
				.ForMember(dest => dest.DisplayName, o => o.MapFrom(src => src.ApplicationUser.DisplayName))
				.ForMember(dest => dest.Username, o => o.MapFrom(src => src.ApplicationUser.UserName));
		}
	}
}
