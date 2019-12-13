using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Reference
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Url { get; set; }
        [Required]
        public int TypeOfReferenceId { get; set; }
        [Required]
        public TypeOfReference TypeOfReference { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
