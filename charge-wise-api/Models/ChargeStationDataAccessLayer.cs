using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace charge_wise_api.Models
{
    public class ChargeStationsDataAccessLayer
    {
        DatabaseContext db = new DatabaseContext();

        //To get all charge stations
        public IEnumerable<ChargeStations> GetAllChargeStations()
        {
            try
            {
                return db.ChargeStations.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new charge station record     
        public int AddChargeStation(ChargeStations chargeStation)
        {
            try
            {
                db.ChargeStations.Add(chargeStation);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar charge station    
        public int UpdateChargeStation(ChargeStations chargeStation)
        {
            try
            {
                db.Entry(chargeStation).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular charge station    
        public ChargeStations GetChargeStationFromId(int id)
        {
            try
            {
                ChargeStations chargeStation = db.ChargeStations.Find(id);
                return chargeStation;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular charge station    
        public int DeleteChargeStation(int id)
        {
            try
            {
                ChargeStations chargeStation = db.ChargeStations.Find(id);
                db.ChargeStations.Remove(chargeStation);
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
