using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Capstone.Models.Data;

namespace Capstone.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<CowriterSongRel> CowriterSongRels { get; set; }
        public DbSet<Reference> References { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<SongWordRel> SongWordRels { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<TypeOfReference> TypeOfReferences { get; set; }
        public DbSet<Word> Words { get; set; }
    }
}
