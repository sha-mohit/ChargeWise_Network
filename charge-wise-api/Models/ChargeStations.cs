using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing.Printing;
using System.ComponentModel.DataAnnotations;

namespace charge_wise_api.Models
{
    public class ChargeStations
    {
        [Key]
        public int ChargeStationId { get; set; }
        public string ChargeStationName { get; set; }
        public string Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Cost { get; set; }
        public bool Open247 { get; set; }
        public byte[] Icon { get; set; }
        public int Total_Number_of_Ports { get; set; }
        //public int Number_of_Ports_In_Use { get; set; }
        //public int Number_of_Ports_offline { get; set; }
        //public int Number_of_Ports_Available { get; set; }
        public string Reviews { get; set; }
        public string Plugin_Types { get; set; }
        public string Renewable_Energy { get; set; }

    }
}
