using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace charge_wise_api.Models
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DatabaseContext(IConfiguration configuration) : base()
        {
            _configuration = configuration;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChargeStations>().ToTable("ChargeStations");
            modelBuilder.Entity<PlugInImages>().ToTable("PlugInImages");

            modelBuilder.Entity<ChargeStations>().HasKey<int>(csid => csid.ChargeStationId);
            modelBuilder.Entity<PlugInImages>().HasKey<int>(plig => plig.Plugin_Image_Id);
            
        }

        public void getDetailsFromDB(string query, DataTable table)
        {
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}
