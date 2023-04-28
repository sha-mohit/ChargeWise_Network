using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using charge_wise_api.Models;
using System.Drawing;
using System;
using System.IO;
using System.Drawing.Imaging;

namespace charge_wise_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlugInImagesController : ControllerBase
    {
        PlugInImagesDataAccessLayer plugInImage = new PlugInImagesDataAccessLayer();

        [HttpGet]
        [Route("api/PlugInImages/Index")]
        public IEnumerable<PlugInImages> Index()
        {
            return plugInImage.GetAllPlugInImages();
        }

        [HttpPost]
        [Route("api/PlugInImages/Create")]
        public int Create(PlugInImages pluginImage)
        {
            return plugInImage.AddPlugInImage(pluginImage);
        }

        [HttpGet]
        [Route("api/PlugInImages/Details/{id}")]
        public PlugInImages Details(int id)
        {
            return plugInImage.GetPlugInImageFromId(id);
        }

        [HttpPut]
        [Route("api/PlugInImages/Edit")]
        public int Edit(PlugInImages pluginImage)
        {
            return plugInImage.UpdatePlugInImage(pluginImage);
        }

        [HttpDelete]
        [Route("api/PlugInImages/Delete/{id}")]
        public int Delete(int id)
        {
            return plugInImage.DeletePlugInImage(id);
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult RetrieveImage(int ID)
        {
            List<PlugInImages> Images = plugInImage.GetAllPlugInImages();
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
