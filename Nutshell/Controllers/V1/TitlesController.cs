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
using Capstone.Helpers;
using Capstone.Models.ViewModels;

namespace Capstone.Controllers.V1
{
    [Authorize]
    [ApiController]
    public class TitlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public TitlesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Titles
        [HttpGet(Api.Titles.GetTitles)]
        public async Task<ActionResult<IEnumerable<Title>>> GetTitles()
        {
            var userId = HttpContext.GetUserId();
            return await _context.Titles.Where(t => t.UserId == userId).OrderBy(t => t.Name).ToListAsync();
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
        // PUT: api/Titles/5
        [HttpPut(Api.Titles.PutTitle)]
        public async Task<IActionResult> PutTitle(int id, Title title)
        {
            if (id != title.Id)
            {
                return BadRequest();
            }

            var userId = HttpContext.GetUserId();
            title.UserId = userId;
            _context.Entry(title).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TitleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // POST: api/Titles
        [HttpPost(Api.Titles.PostTitle)]
        public async Task<ActionResult<Title>> PostTitle(TitleCreateViewModel tcvw)
        {
            Title newTitle = new Title
            {
                Name = tcvw.Name,
                UserId = HttpContext.GetUserId()
            };

            _context.Titles.Add(newTitle);
            await _context.SaveChangesAsync();

            var foundTitle = _context.Titles.Where(w => w.UserId == newTitle.UserId).OrderByDescending(w => w.Id).Take(1);


            return Ok(foundTitle);

        }

        // DELETE: api/Titles/5
        [HttpDelete(Api.Titles.DeleteTitle)]
        public async Task<ActionResult<Title>> DeleteTitle(int id)
        {
            var title = await _context.Titles.FindAsync(id);
            if (title == null)
            {
                return NotFound();
            }

            _context.Titles.Remove(title);
            await _context.SaveChangesAsync();

            return title;
        }
        private bool TitleExists(int id)
        {
            return _context.Titles.Any(e => e.Id == id);
        }
    }
}