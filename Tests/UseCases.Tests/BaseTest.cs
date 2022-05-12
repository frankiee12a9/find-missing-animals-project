using System;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace UseCases.Tests
{
    public class BaseTest
    {
        public AppDataContext GetAppDbContext(bool useNpgsql = false)
        {
            var builder = new DbContextOptionsBuilder<DataContext>();
            if (useNpgsql)
            {
                builder.UseNpgsql("Data Source=:memory", x => { });
            }
            else
            {
                builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
            }
            
            var dbContext = new DataContext(builder.Options);

            if (useNpgsql)
            {
                dbContext.Database.OpenConnection();
            }

            dbContext.Database.EnsureCreated();

            return dbContext;
        }
    }
}