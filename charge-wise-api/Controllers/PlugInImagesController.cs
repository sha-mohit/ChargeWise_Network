using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using charge_wise_api.Models;

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

    }
}
