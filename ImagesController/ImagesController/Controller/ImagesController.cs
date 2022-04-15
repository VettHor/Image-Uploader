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

namespace ImagesController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        static MyDBRepository myDBRepository = new MyDBRepository();

        [HttpPost]
        [Route("add_images")]
        public async Task<IActionResult> AddImages([FromForm] FileModel file)
        {
            //string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
            //using(Stream stream = new FileStream(path, FileMode.Create))
            //{
            //    file.FormFile.CopyTo(stream);
            //}



            ImageDB imageDB = new ImageDB();
            using (var memoryStream = new MemoryStream())
            {
                file.FormFile.CopyTo(memoryStream);
                imageDB.Image = memoryStream.ToArray();
                imageDB.ImageName = file.FileName;
                myDBRepository.AddImage(imageDB);
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
        return myDBRepository.GetAllImages().Any() is true ? myDBRepository.GetAllImages() : null;
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
