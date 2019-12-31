using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.DataModels
{
    public class Quote
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(1500)]
        public string QuoteText { get; set; }

        public string QuoteAuthor { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        public int PageId { get; set; }

        public Page Page { get; set; }

    }
}
