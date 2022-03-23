using System;
using System.Linq;
using System.Runtime.ExceptionServices;
using AutoMapper;
using Domain;
using Modules.AppUsers;
using Modules.Categories;
using Modules.Comments;
using Modules.Interfaces;
using Modules.Locations;
using Modules.Posts;
using Modules.Tags;

namespace Modules.Core
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			string currentUsername = "";

			CreateMap<Post, PostDto>();

			CreateMap<Tag, TagDto>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.TagName));

			CreateMap<PostTag, TagDto>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.TagId))
				.ForMember(dest => dest.TagName, o => o.MapFrom(src => src.Tag.TagName));

			CreateMap<Category, CategoryDto>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.CategoryName, o => o.MapFrom(src => src.CategoryName));

			// mapping PostFollowing - PostParticipant
			// CreateMap<PostFollowing, PostParticipantDto>()
			// 	.ForMember(dest => dest.DisplayName, o => o.MapFrom(src => src.ApplicationUser.DisplayName));

			CreateMap<PostLocation, PostLocationDto>()
				.ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
				.ForMember(dest => dest.PostCode, o => o.MapFrom(src => src.PostCode))
				.ForMember(dest => dest.RoadLocation, o => o.MapFrom(src => src.RoadLocation))
				.ForMember(dest => dest.Location, o => o.MapFrom(src => src.Location))
				.ForMember(dest => dest.ExtraLocation, o => o.MapFrom(src => src.ExtraLocation))
				.ForMember(dest => dest.Location, o => o.MapFrom(src => src.Location))
				.ForMember(dest => dest.Latitude, o => o.MapFrom(src => src.Latitude));

			CreateMap<Post, PostDto>()
				.ForMember(dest => dest.PosterName,
				o => o.MapFrom(src => src.PostFollowers.FirstOrDefault(x => x.isPoster).ApplicationUser.UserName))
				.ForMember(dest => dest.PostLocation, o => o.MapFrom(src => src.PostLocation))
				.ForMember(dest => dest.Tags, o => o.MapFrom(src => src.PostTags))
				.ForMember(dest => dest.Category, o => o.MapFrom(src => src.Category))
				.ForMember(dest => dest.PostParticipants, o => o.MapFrom(src => src.PostFollowers));

			// CreateMap<ApplicationUser, PostParticipantDto>()
			// 	.ForMember(dest => dest.Image, o => o.MapFrom(x => x.Photos.FirstOrDefault(p => p.IsProfilePicture).Url));

			CreateMap<Comment, CommentDto>()
				.ForMember(dest => dest.DisplayName, o => o.MapFrom(src => src.ApplicationUser.DisplayName))
				.ForMember(dest => dest.Username, o => o.MapFrom(src => src.ApplicationUser.UserName))
				.ForMember(dest => dest.ImageUrl, o => o.MapFrom(src => src.ApplicationUser.Photos
					.FirstOrDefault(x => x.IsProfilePicture).Url));

		}
	}
}
