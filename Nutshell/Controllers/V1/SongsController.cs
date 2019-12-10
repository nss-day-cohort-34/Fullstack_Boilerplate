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

namespace Capstone.Controllers.V1
{
    [Authorize]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SongsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Songs
        [HttpGet(Api.Songs.GetSongs)]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
        {
            var userId = HttpContext.GetUserId();
            return await _context.Songs.Where(s => s.InProgress == true && s.UserId == userId).ToListAsync();
        }

        // GET: api/Songs/5
        [HttpGet(Api.Songs.GetSong)]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await _context.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return song;
        }
    }
}

        //// PUT: api/Songs/5
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
        //// more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutSong(int id, Song song)
        //{
        //    if (id != song.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(song).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!SongExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Songs
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
        //// more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPost]
        //public async Task<ActionResult<Song>> PostSong(Song song)
        //{
        //    _context.Songs.Add(song);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetSong", new { id = song.Id }, song);
        //}

        //// DELETE: api/Songs/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Song>> DeleteSong(int id)
        //{
        //    var song = await _context.Songs.FindAsync(id);
        //    if (song == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Songs.Remove(song);
        //    await _context.SaveChangesAsync();

        //    return song;
        //}

        //private bool SongExists(int id)
        //{
        //    return _context.Songs.Any(e => e.Id == id);
        //}
