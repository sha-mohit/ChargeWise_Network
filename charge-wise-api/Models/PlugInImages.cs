using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace charge_wise_api.Models
{
    public class PlugInImages
    {
        public int Plugin_Image_Id { get; set; }
        public string PlugIn_Image_Name { get; set; }
        public byte[] PlugIn_Image { get; set; }
    }
}
