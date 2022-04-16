using ImagesController.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ImagesController.DBContext.Image
{
    public class ImageDBRepository
    {
        public async void AddImage(ImageDB imageDB)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.ImageDB.Add(imageDB);
                await myDBContext.SaveChangesAsync();
            }
        }
        public async void DeleteAllImages()
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.ImageDB.RemoveRange(myDBContext.ImageDB);
                await myDBContext.SaveChangesAsync();
            }
        }

        public List<ImageDB> GetAllImages()
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.ImageDB.ToList();
            }
        }
        public List<ImageDB> GetImagesByWord(string word)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.ImageDB
                    .ToList()
                    .Where(image => image.ImageName.Contains(word, System.StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }
        }
    }
}
