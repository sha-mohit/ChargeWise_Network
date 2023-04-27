using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using charge_wise_api.Models;

namespace charge_wise_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ChargeStationsController : ControllerBase
    {
        ChargeStationsDataAccessLayer chargeStation = new ChargeStationsDataAccessLayer();

        [HttpGet]
        [Route("api/ChargeStations/Index")]
        public IEnumerable<ChargeStations> Index()
        {
            return chargeStation.GetAllChargeStations();
        }

        [HttpPost]
        [Route("api/ChargeStations/Create")]
        public int Create(ChargeStations chargestation)
        {
            return chargeStation.AddChargeStation(chargestation);
        }

        [HttpGet]
        [Route("api/ChargeStations/Details/{id}")]
        public ChargeStations Details(int id)
        {
            return chargeStation.GetChargeStationFromId(id);
        }

        [HttpPut]
        [Route("api/ChargeStations/Edit")]
        public int Edit(ChargeStations chargestation)
        {
            return chargeStation.UpdateChargeStation(chargestation);
        }

        [HttpDelete]
        [Route("api/ChargeStations/Delete/{id}")]
        public int Delete(int id)
        {
            return chargeStation.DeleteChargeStation(id);
        }

    }
}
