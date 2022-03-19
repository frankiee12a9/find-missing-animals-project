namespace Domain
{
	// Todo: considering Model
	public class PostFollower
	{
		public string ObserverId { get; set; }
		public ApplicationUser Observer { get; set; }
		public string TargetPostId { get; set; }
		public Post TargetPost { get; set; }
	}
}
