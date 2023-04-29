using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using charge_wise_api.Models;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace charge_wise_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ChargeStationsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        DatabaseContext db;
        public ChargeStationsController(IConfiguration configuration)
        {
            _configuration = configuration;
            db = new DatabaseContext(_configuration);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.ChargeStations";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            return new JsonResult(table);
        }

        [HttpGet("{ChargeStationId}")]
        public JsonResult Get(ChargeStations chargeStation)
        {
            string query = @"select * from dbo.ChargeStations where ChargeStationId = '" + chargeStation.ChargeStationId + "'";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            return new JsonResult(table);
        }

        [HttpPost]
        [Route("[action]")]
        public JsonResult AddChargeStation(ChargeStations chargeStation)
        {
            string query = @"insert into dbo.ChargeStations values (@ChargeStationName,@Address,@Latitude,@Longitude,@Cost,@Open247,@Icon,@Total_Number_of_Ports,@Plugin_Types,@Reviews,@Renewable_Energy)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ChargeStationName", chargeStation.ChargeStationName);
                    myCommand.Parameters.AddWithValue("@Address", chargeStation.Address);
                    myCommand.Parameters.AddWithValue("@Latitude", chargeStation.Latitude);
                    myCommand.Parameters.AddWithValue("@Longitude", chargeStation.Longitude);
                    myCommand.Parameters.AddWithValue("@Cost", chargeStation.Cost);
                    myCommand.Parameters.AddWithValue("@Open247", chargeStation.Open247);
                    myCommand.Parameters.AddWithValue("@Icon", chargeStation.Icon);
                    myCommand.Parameters.AddWithValue("@Total_Number_of_Ports", chargeStation.Total_Number_of_Ports);
                    myCommand.Parameters.AddWithValue("@Plugin_Types", chargeStation.Plugin_Types);
                    myCommand.Parameters.AddWithValue("@Reviews", chargeStation.Reviews);
                    myCommand.Parameters.AddWithValue("@Renewable_Energy", chargeStation.Renewable_Energy);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(ChargeStations chargeStation)
        {
            string query = @"update dbo.ChargeStations set ChargeStationName=@ChargeStationName,Address=@Address,Latitude=@Latitude,Longitude=@Longitude,Cost=@Cost,Open247=@Open247,Icon=@Icon,Total_Number_of_Ports=@Total_Number_of_Ports,@Plugin_Types,Reviews=@Reviews,Renewable_Energy=@Renewable_Energy where ChargeStationId = @ChargeStationId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ChargeStationName", chargeStation.ChargeStationName);
                    myCommand.Parameters.AddWithValue("@Address", chargeStation.Address);
                    myCommand.Parameters.AddWithValue("@Latitude", chargeStation.Latitude);
                    myCommand.Parameters.AddWithValue("@Longitude", chargeStation.Longitude);
                    myCommand.Parameters.AddWithValue("@Cost", chargeStation.Cost);
                    myCommand.Parameters.AddWithValue("@Open247", chargeStation.Open247);
                    myCommand.Parameters.AddWithValue("@Icon", chargeStation.Icon);
                    myCommand.Parameters.AddWithValue("@Total_Number_of_Ports", chargeStation.Total_Number_of_Ports);
                    myCommand.Parameters.AddWithValue("@Plugin_Types", chargeStation.Plugin_Types);
                    myCommand.Parameters.AddWithValue("@Reviews", chargeStation.Reviews);
                    myCommand.Parameters.AddWithValue("@Renewable_Energy", chargeStation.Renewable_Energy);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpDelete("{ChargeStationId}")]
        public JsonResult Delete(int chargeStationId)
        {
            string query = @"delete from dbo.ChargeStations where ChargeStationId = @ChargeStationId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ChargeStationId", chargeStationId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

    }
}
