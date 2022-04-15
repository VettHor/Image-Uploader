using ImagesController.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ImagesController.DBContext
{
    public class MyDBRepository
    {
        public async void AddImage(ImageDB imageDB)
        {
            using (MyDBContext myDBContext = new MyDBContext())
            {
                myDBContext.ImageDB.Add(imageDB);
                await myDBContext.SaveChangesAsync();
            }
        }
        public async void DeleteAllImages()
        {
            using (MyDBContext myDBContext = new MyDBContext())
            {
                myDBContext.ImageDB.RemoveRange(myDBContext.ImageDB);
                await myDBContext.SaveChangesAsync();
            }
        }

        public List<ImageDB> GetAllImages()
        {
            using (MyDBContext myDBContext = new MyDBContext())
            {
                return myDBContext.ImageDB.ToList();
            }
        }
    }
}
