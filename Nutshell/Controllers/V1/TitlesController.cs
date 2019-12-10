using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Capstone.Routes.V1;
using Microsoft.AspNetCore.Identity;

namespace Capstone.Controllers.V1
{
    [ApiController]
    public class TitlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        public TitlesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Titles
        [HttpGet(Api.Titles.GetTitles)]
        public async Task<ActionResult<IEnumerable<Title>>> GetTitles()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            return await _context.Titles.ToListAsync();
        }

        // GET: api/Titles/5
        [HttpGet(Api.Titles.GetTitle)]
        public async Task<ActionResult<Title>> GetTitle(int id)
        {
            var title = await _context.Titles.FindAsync(id);

            if (title == null)
            {
                return NotFound();
            }

            return title;
        }
    }
}