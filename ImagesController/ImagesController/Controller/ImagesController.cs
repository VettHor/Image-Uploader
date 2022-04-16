using ImagesController.DBContext;
using ImagesController.Models.Entities;
using ImagesController.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using ImagesController.DBContext.Image;
using ImagesController.DBContext.Administrator;

namespace ImagesController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        static ImageDBRepository imageDBRepository = new ImageDBRepository();
        static AdministratorDBRepository administratorDBRepository = new AdministratorDBRepository();

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

        [HttpGet]
        [Route("contains_administrator/{email}/{password}")]
        public bool GetImagesByWord(string email, string password)
        {
            return administratorDBRepository.Contains(email, password);
        }
        //    [HttpDelete]
        //    [Route("delete_images")]
        //    public async Task<IActionResult> DeleteAllImages()
        //    {
        //        if (myDBRepository.GetAllImages().Any() is not true)
        //            return NotFound();
        //        myDBRepository.DeleteAllImages();
        //        return Ok(new
        //        {
        //            Message = "Succesfully deleted images!",
        //            Status = (int)HttpStatusCode.OK,
        //        });
        //    }
    }
}
