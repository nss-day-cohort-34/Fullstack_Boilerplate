using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.ViewModels
{
    public class ReferenceCreateViewModel
    {
        [Required]
        public string Name { get; set; }
        public string Url { get; set; }
        [Required]
        public int TypeOfReferenceId { get; set; }
    }
}
