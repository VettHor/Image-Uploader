using ImagesController.DBContext;
using ImagesController.Models.Entities;
using ImagesController.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Collections.Generic;

namespace ImagesController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        static ImageDBRepository imageDBRepository = new ImageDBRepository();

        [HttpPost]
        [Route("add_images")]
        public async Task<IActionResult> AddImages([FromForm] FileModel file)
        {
            ImageDB imageDB = new ImageDB();
            using (var memoryStream = new MemoryStream())
            {
                file.FormFile.CopyTo(memoryStream);
                imageDB.Image = memoryStream.ToArray();
                imageDB.ImageName = file.FileName;
                imageDBRepository.AddImage(imageDB);
            }
            return Ok(new
            {
                Message = "Succesfully added images!",
                Status = (int)HttpStatusCode.Created
            });
        }


        [HttpGet]
        [Route("get_images")]
        public List<ImageDB> GetAllImages()
        {
            return imageDBRepository.GetAllImages();
        }

        [HttpGet]
        [Route("get_image_by_word/{word}")]
        public List<ImageDB> GetImagesByWord(string word)
        {
            return imageDBRepository.GetImagesByWord(word);
        }

        [HttpPost]
        [Route("add_user/{state}")]
        public async Task<IActionResult> AddUser(UserDB user, string state)
        {
            bool alreadyExist = imageDBRepository.Contains(user);
            if (state == "create") {
                if (alreadyExist)
                    return Ok(new
                    {
                        Message = "Such user already exists!",
                        User = user,
                        Exists = alreadyExist
                    });
                imageDBRepository.AddUser(user);
                return Ok(new
                {
                    Message = "Succesfully created a profile!",
                    User = user,
                    Exists = alreadyExist
                });
            }
            if(alreadyExist) {
                return Ok(new {
                    Message = "Successfully logged in!",
                    User = imageDBRepository.GetUserByEmailPassword(user),
                    Exists = alreadyExist
                });
            }
            return Ok(new {
                Message = "There is no such user, create it!",
                User = user,
                Exists = alreadyExist
            });
        }

        [HttpDelete]
        [Route("delete_images")]
        public async Task<IActionResult> DeleteAllImages()
        {
            if (imageDBRepository.GetAllImages().Any() is not true)
                return NotFound();
            imageDBRepository.DeleteAllImages();
            return Ok(new
            {
                Message = "Succesfully deleted images!",
                Status = (int)HttpStatusCode.OK,
            });
        }

        [Route("delete_image/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteImage(int id)
        {
            ImageDB image = imageDBRepository.GetImageById(id);
            if (image is null)
                return NotFound();
            imageDBRepository.DeleteImage(image);
            return Ok(new
            {
                Message = "Succesfully deleted an image!",
                Status = (int)HttpStatusCode.OK,
            });
        }

        [HttpDelete]
        [Route("delete_users")]
        public async Task<IActionResult> DeleteAllUsers()
        {
            if (imageDBRepository.GetAllUsers().Any() is not true)
                return NotFound();
            imageDBRepository.DeleteAllUsers();
            return Ok(new
            {
                Message = "Succesfully deleted users!",
                Status = (int)HttpStatusCode.OK,
            });
        }

        [Route("delete_user/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            UserDB player = imageDBRepository.GetUserById(id);
            if (player is null)
                return NotFound();
            imageDBRepository.DeleteUser(player);
            return Ok(new
            {
                Message = "Succesfully deleted a user!",
                Status = (int)HttpStatusCode.OK,
            });
        }

        [HttpPost]
        [Route("add_user")]
        public async Task<IActionResult> AddUser(UserDB user)
        {
            imageDBRepository.AddUser(user);
            return Ok(new
            {
                Message = "Succesfully added new user!",
                Status = (int)HttpStatusCode.Created,
                Player = user
            });
        }
    }
}
