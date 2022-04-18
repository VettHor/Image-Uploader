using ImagesController.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ImagesController.DBContext
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
        public ImageDB GetImageById(int id)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.ImageDB.FirstOrDefault(p => p.Id == id);
            }
        }

        public async void DeleteImage(ImageDB imageDB)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.ImageDB.Remove(imageDB);
                await myDBContext.SaveChangesAsync();
            }
        }

        public bool Contains(UserDB userDB)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.UserDB.Any(adm =>
                    adm.Email == userDB.Email && 
                    adm.Password == userDB.Password);
            }
        }

        public async void AddUser(UserDB userDB)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.UserDB.Add(userDB);
                await myDBContext.SaveChangesAsync();
            }
        }
        public List<UserDB> GetAllUsers()
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.UserDB.ToList();
            }
        }
        public async void DeleteAllUsers()
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.UserDB.RemoveRange(myDBContext.UserDB);
                await myDBContext.SaveChangesAsync();
            }
        }

        public UserDB GetUserById(int id)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.UserDB.FirstOrDefault(p => p.Id == id);
            }
        }

        public UserDB GetUserByEmailPassword(UserDB user)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                return myDBContext.UserDB.FirstOrDefault(p => 
                    p.Email == user.Email && 
                    p.Password == user.Password);
            }
        }

        public async void DeleteUser(UserDB playerDb)
        {
            using (ImageDBContext myDBContext = new ImageDBContext())
            {
                myDBContext.UserDB.Remove(playerDb);
                await myDBContext.SaveChangesAsync();
            }
        }
    }
}
