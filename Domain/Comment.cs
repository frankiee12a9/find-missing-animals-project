using System;

namespace Domain
{
	public class Comment
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string ApplicationUserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public Guid PostId { get; set; }
		public Post Post { get; set; }
        // DateTime.Now: 현재 지역의 시간으로 표현되는데 
        // DateTime.UtcNow:  UTC(세계 협정시)는 영국을 기준으로, 세계의 시간을 표현
		public DateTime Timestamp { get; set; } = DateTime.Now;
	}
}
