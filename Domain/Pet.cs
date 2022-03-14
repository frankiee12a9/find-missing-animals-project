using System;

namespace Domain
{
	public class Pet
	{
		public Guid ID { get; set; }
		public string Type { get; set; }
		public string Color { get; set; }
		public int Height { get; set; }
		public int Width { get; set; }
	}
}
