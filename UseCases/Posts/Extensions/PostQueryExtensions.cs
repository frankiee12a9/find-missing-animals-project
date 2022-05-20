using System;
using System.Collections.Generic;
using System.Linq;

namespace UseCases.Posts.Extensions
{
    public static class PostQueryExtensions
    {
         public static IQueryable<PostDto> _Sort(this IQueryable<PostDto> query, string orderBy) 
         {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.CreatedAt);

            query = orderBy switch 
            {
                "title" => query.OrderBy(p => p.Title),
                "postLocation" => query.OrderBy(p => p.PostLocation.Location),
                // "found" => query.OrderBy(p => p.IsFound),
                "found" => query.Where(p => p.IsFound == true),
                "notFound" => query.Where(p => p.IsFound == false),
                _ => query.OrderBy(p => p.CreatedAt)
            };

            return query;
         }

         public static IQueryable<PostDto> _Search(this IQueryable<PostDto> query, string searchText) 
         {
            if (string.IsNullOrEmpty(searchText)) return query;
             
            var lowerCaseSearchText = searchText.Trim().ToLower();

            return query.Where(p => p.Title.Contains(lowerCaseSearchText) 
                || p.Content.Contains(lowerCaseSearchText) 
                || p.PostLocation.Location.Contains(lowerCaseSearchText)
                || p.PosterName.Contains(lowerCaseSearchText));
         }

         public static IQueryable<PostDto> _Filter(this IQueryable<PostDto> query, string tags)  
         {
             var tagFilterList = new List<string>();
            
            if (!string.IsNullOrEmpty(tags)) 
                tagFilterList.AddRange(tags.ToLower().Split(",").ToList());

            // Note: still working on this           
            query = query.Where(p => tagFilterList.Count == 0 || tagFilterList.Contains(p.Tag1.Tag1Name));

            return query;
         } 
    }
}