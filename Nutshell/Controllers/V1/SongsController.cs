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
            return await _context.Songs.Where(s => s.InProgress == true && s.UserId == userId).OrderBy(s => s.Title).ToListAsync();
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

        // PUT: api/Songs/5
        [HttpPut(Api.Songs.PutSong)]
        public async Task<IActionResult> PutSong(int id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }

            var userId = HttpContext.GetUserId();
            song.UserId = userId;
            _context.Entry(song).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
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
        // POST: api/Songs
        [HttpPost(Api.Songs.PostSong)] 
        public async Task<ActionResult<Song>> PostSong(SongCreateViewModel scvw) 
        {
            Song newSong = new Song
            {
                Title = scvw.Title,
                Lyrics = scvw.Lyrics,
                UserId = HttpContext.GetUserId()
            };

                _context.Songs.Add(newSong);
                await _context.SaveChangesAsync();

                var foundSong = _context.Songs.Where(s => s.UserId == newSong.UserId).OrderByDescending(s => s.Id).Take(1);

                return Ok(foundSong);

        }

        // DELETE: api/Songs/5
        [HttpDelete(Api.Songs.DeleteSong)]
        public async Task<ActionResult<Song>> DeleteSong(int id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return song;
        }
        private bool SongExists(int id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}



