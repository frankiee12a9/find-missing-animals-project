using System;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace UseCases.Test
{
    public class BaseTest
    { 
        public AppDataContext GetAppDataContext(bool useNpgsql = false)
        {
            // var builder = new DbContextOptionsBuilder<AppDataContext>();
            var builder = new DbContextOptionsBuilder<AppDataContext>();
            if (useNpgsql) 
            {
                // builder.UseNpgsql();
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