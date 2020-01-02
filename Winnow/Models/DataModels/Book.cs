using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.DataModels
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
       
        [MinLength(1)]
        [MaxLength(140)]
        public string Title{ get; set; }

        [MinLength(1)]
        [MaxLength(550)]
        public string Description { get; set; }

        [Required]
        [Display(Name = "Creation Date")]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; } 

        [Required]
        public bool StartsBlank { get; set; }

    
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public ICollection<Page> Pages { get; set; }

    }
}
