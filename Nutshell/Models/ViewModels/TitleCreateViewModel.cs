using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.ViewModels
{
    public class TitleCreateViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
