using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Domain
{
	public class PetLocation
	{
		public string PostCode { get; set; }
		public string RoadLocation { get; set; } // 도로명주소
		[Required]
		public string Location { get; set; } // 지번주소
		public string DetailedLocation { get; set; } // 상세주소 
		public string ExtraLocation { get; set; } // 참고항목
		public double? Longitude { get; set; }
		public double? Latitude { get; set; }
	}
}
