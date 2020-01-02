using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.ViewModels
{
    public class UserLoginViewModel
    {      
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
