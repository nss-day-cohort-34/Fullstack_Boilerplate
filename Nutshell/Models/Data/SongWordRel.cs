using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class SongWordRel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int SongId { get; set; }
        [Required]
        public Song Song { get; set; }
        [Required]
        public int WordId { get; set; }
        [Required]
        public Word Word { get; set; }
    }
}
