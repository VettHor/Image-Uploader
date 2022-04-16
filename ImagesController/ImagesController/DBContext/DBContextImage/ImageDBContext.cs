using ImagesController.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;

namespace ImagesController.DBContext.Image
{
    public class ImageDBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private static readonly string _connectionString = "Data Source=DESKTOP-JM82IU2;Initial Catalog=GoogleDB;Integrated Security=True";
        public ImageDBContext() { }
        public Microsoft.EntityFrameworkCore.DbSet<ImageDB> ImageDB { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(_connectionString);
            base.OnConfiguring(builder);
        }
    }
}
