using UseCases.Core;

namespace UseCases.ApplicationUsers.Extensions
{
    public class UserQueryParams: PagingParams
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
    }
}