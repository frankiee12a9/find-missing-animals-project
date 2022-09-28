using System;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace UseCases.Tests
{
    public class BaseTest
    {
        public AppDataContext GetAppDbContext(bool useNpgsql = false)
        {
            var builder = new DbContextOptionsBuilder<AppDataContext>();
            if (useNpgsql)
            {
                builder.UseNpgsql("Server=localhost; Port=5432; User Id=cudayanh; Password=kien12a9; Database=finalProjectPGQL; Integrated Security=true;Pooling=true;", x => { });
                // builder.UseNpgsql("Server=localhost; Port=5432; User Id=cudayanh; Password=kien12a9; Database=finalProjectPGQL; Integrated Security=true;Pooling=true;", x => { });
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