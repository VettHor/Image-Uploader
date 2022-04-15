using ImagesController.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;

namespace ImagesController.DBContext
{
    public class MyDBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private static readonly string _connectionString = "Data Source=DESKTOP-JM82IU2;Initial Catalog=GoogleDB;Integrated Security=True";
        public MyDBContext() { }
        public Microsoft.EntityFrameworkCore.DbSet<ImageDB> ImageDB { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(_connectionString);
            base.OnConfiguring(builder);
        }
    }
}
