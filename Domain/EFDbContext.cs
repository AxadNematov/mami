using System.Data.Entity;
using Domain.Entities;


namespace Domain
{
    public class EFDbContext : DbContext
    {
        //public EFDbContext(string connectionString)
        //{
        //Database.Connection.ConnectionString = connectionString;
        //}
        public EFDbContext() : base("name = PrimaryConnectionString") { }
        public DbSet<cm003t> Meters { get; set; }
    }
}
