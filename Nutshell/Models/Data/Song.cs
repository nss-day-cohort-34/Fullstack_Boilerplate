using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Song
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Lyrics { get; set; }
        [Required]
        public bool InProgress { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public ApplicationUser User { get; set; }
        public Song()
        {
            InProgress = true;
        }
    }
}
