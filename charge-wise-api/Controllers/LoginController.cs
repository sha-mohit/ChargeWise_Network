using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using charge_wise_api.Models;

namespace charge_wise_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        
        private readonly IConfiguration _configuration;
        DatabaseContext db;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
             db = new DatabaseContext(_configuration);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select UserId, UserName,UserEmail,Password,UserRole from dbo.Login";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            return new JsonResult(table);
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult IsUser(Login login)
        {
            string query = @"select UserRole from dbo.Login where UserEmail = '" + login.UserEmail + "' and Password = '" + login.Password + "'";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            if (table.Rows.Count > 0)
                return new JsonResult(table);
            else
                return new JsonResult("No User Found");
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult IsExistingUser(Login login)
        {
            string query = @"select UserRole from dbo.Login where UserEmail = '" + login.UserEmail + "'";
            DataTable table = new DataTable();
            db.getDetailsFromDB(query, table);
            if (table.Rows.Count > 0)
                return new JsonResult("User Already Exists");
            else
                return new JsonResult("No User Found");
        }

        [HttpPost]
        public JsonResult Post(Login login)
        {
            string query = @"insert into dbo.Login values (@UserName,@UserEmail,@Password,@UserRole)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserName", login.UserName);
                    myCommand.Parameters.AddWithValue("@UserEmail", login.UserEmail);
                    myCommand.Parameters.AddWithValue("@Password", login.Password);
                    myCommand.Parameters.AddWithValue("@UserRole", login.UserRole);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(Login login)
        {
            string query = @"update dbo.Login set UserName= @UserName,UserEmail=@UserEmail,Password=@Password,UserRole=@UserRole where UserID = @UserID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserID", login.UserId);
                    myCommand.Parameters.AddWithValue("@UserName", login.UserName);
                    myCommand.Parameters.AddWithValue("@UserEmail", login.UserEmail);
                    myCommand.Parameters.AddWithValue("@Password", login.Password);
                    myCommand.Parameters.AddWithValue("@UserRole", login.UserRole);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpDelete("{userId}")]
        public JsonResult Delete(int userId)
        {
            string query = @"delete from dbo.Login where UserID = @UserID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ChargeWiseCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserID", userId);
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
