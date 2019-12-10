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
    public class WordsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        public WordsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Words
        [HttpGet(Api.Words.GetWords)]
        public async Task<ActionResult<IEnumerable<Word>>> GetWords()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            return await _context.Words.ToListAsync();
        }

        // GET: api/Words/5
        [HttpGet(Api.Words.GetWord)]
        public async Task<ActionResult<Word>> GetWord(int id)
        {
            var word = await _context.Words.FindAsync(id);

            if (word == null)
            {
                return NotFound();
            }

            return word;
        }
    }
}