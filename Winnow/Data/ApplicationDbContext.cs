using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Capstone.Models.DataModels;


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
        public DbSet<Book> Books { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<Quote> Quotes { get; set; }
    }
}
