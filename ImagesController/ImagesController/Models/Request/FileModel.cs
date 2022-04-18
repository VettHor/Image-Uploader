using Microsoft.AspNetCore.Http;

namespace ImagesController.Models.Request
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
