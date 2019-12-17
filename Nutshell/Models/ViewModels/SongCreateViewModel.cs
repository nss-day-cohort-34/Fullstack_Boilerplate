using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.ViewModels
{
    public class SongCreateViewModel
    {
        public string Title { get; set; }
        public string Lyrics { get; set; }
        public bool Visable { get; set; }
    }
}
