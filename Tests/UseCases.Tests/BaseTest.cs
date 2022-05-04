using System;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace UseCases.Tests
{
	public class BaseTest
	{
		// Note: testing reference: https://github.com/TryCatchLearn/Reactivities30/blob/TestingExample/tests/Application.Tests/TestBase.cs
		public AppDataContext GetDataContext(bool useNpgsql = false)
		{
			var builder = new DbContextOptionsBuilder<AppDataContext>();
			if (useNpgsql)
			{
				builder.UseNpgsql("Server=:memory", x => { });
			}
			else
			{
				builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
			}

			var dbContext = new AppDataContext(builder.Options);
			if (useNpgsql)
			{
				dbContext.Database.OpenConnection();
			}

			dbContext.Database.EnsureCreated();

			return dbContext;
		}
	}
}
