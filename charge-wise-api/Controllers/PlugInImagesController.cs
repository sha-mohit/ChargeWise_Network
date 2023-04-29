using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using charge_wise_api.Models;
using System.Drawing;
using System;
using System.IO;
using System.Drawing.Imaging;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace charge_wise_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlugInImagesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        DatabaseContext db;
        public PlugInImagesController(IConfiguration configuration)
        {
            _configuration = configuration;
            db = new DatabaseContext(_configuration);
        }

        [HttpGet]
        [Route("[action]")]
        public List<PlugInImages> GetList()
        {
            string query = @"select * from dbo.PlugInImages";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            List<PlugInImages> plugInImages = new List<PlugInImages>();
           
            return plugInImages;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.PlugInImages";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            return new JsonResult(table);
        }

        [HttpGet("{Plugin_Image_Id}")]
        public JsonResult RetrieveImage(int ID)
        {
            List<PlugInImages> Images = GetList();
            byte[] imageData = Images.Find(x => x.Plugin_Image_Id == ID).PlugIn_Image;
            string imageBase64Data = Convert.ToBase64String(Images.Find(x => x.Plugin_Image_Id == ID).PlugIn_Image); ;
            //string imageDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);

            Image image;
            byte[] imageBytes = Convert.FromBase64String(imageBase64Data);
            using (var ms = new MemoryStream(imageBytes))
            {
                image = Image.FromStream(ms);
            }
            string imageFormat = ImageFormat.Png.ToString().ToLower();
            string html = $"<img src=\"data:image/{imageFormat};base64,{imageBase64Data}\"/>";

            return new JsonResult(html);
        }

    }
}
