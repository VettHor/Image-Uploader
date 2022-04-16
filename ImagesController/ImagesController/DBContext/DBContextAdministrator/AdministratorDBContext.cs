using ImagesController.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;

namespace ImagesController.DBContext.Administrator
{
    public class AdministratorDBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private static readonly string _connectionString = "Data Source=DESKTOP-JM82IU2;Initial Catalog=AdministratorDB;Integrated Security=True";
        public AdministratorDBContext() { }
        public Microsoft.EntityFrameworkCore.DbSet<AdministratorDB> AdministratorDB { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(_connectionString);
            base.OnConfiguring(builder);
        }
    }
}
