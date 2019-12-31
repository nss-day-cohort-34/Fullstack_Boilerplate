using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.DataModels
{
    public class Page
    {
        public int Id { get; set; }

        [Required]
        public string Month { get; set; }

        [Required]
        public string Day { get; set; }

        
        [MaxLength(1800)]
        public string Thought { get; set; }

        [Required]
        public int BookId { get; set; }

        public Book Book { get; set; }

        public ICollection<Quote> Quotes { get; set;}
    }
}
