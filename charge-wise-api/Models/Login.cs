using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace charge_wise_api.Models
{
    public class Login
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserEmail { get; set; }
        public string UserRole { get; set; }
    }
}
