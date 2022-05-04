using System;
using Xunit;

namespace UseCases.Tests
{
	public class UnitTest1
	{
		[Fact]
		public void PassingTest()
		{
			Assert.Equal(4, sum(2, 2));
		}

		[Fact]
		public void FailingTest()
		{
			Assert.Equal(5, sum(2, 2));
		}

		int sum(int x, int y)
		{
			return x + y;
		}
	}
}
