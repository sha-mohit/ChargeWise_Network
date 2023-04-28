using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace charge_wise_api.Models
{
    public class PlugInImagesDataAccessLayer
    {
        DatabaseContext db = new DatabaseContext();

        //To get all plugin images
        public List<PlugInImages> GetAllPlugInImages()
        {
            try
            {
                return db.PlugInImages.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new plugin image record     
        public int AddPlugInImage(PlugInImages plugInImage)
        {
            try
            {
                db.PlugInImages.Add(plugInImage);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar plugin image    
        public int UpdatePlugInImage(PlugInImages plugInImage)
        {
            try
            {
                db.Entry(plugInImage).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular plugin image    
        public PlugInImages GetPlugInImageFromId(int id)
        {
            try
            {
                PlugInImages plugInImage = db.PlugInImages.Find(id);
                return plugInImage;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular charge station    
        public int DeletePlugInImage(int id)
        {
            try
            {
                PlugInImages plugInImage = db.PlugInImages.Find(id);
                db.PlugInImages.Remove(plugInImage);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
              

    }
}
