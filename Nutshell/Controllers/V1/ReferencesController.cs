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
using Capstone.Helpers;
using Capstone.Routes.V1;
using Capstone.Models.ViewModels;

namespace Capstone.Controllers.V1
{
    [Authorize]
    [ApiController]
    public class ReferencesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReferencesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/References
        [HttpGet(Api.References.GetReferenceTypes)]
        public async Task<ActionResult<IEnumerable<TypeOfReference>>> GetReferenceTypes()
        {
            return await _context.TypeOfReferences.ToListAsync();
        }
        
        [HttpGet(Api.References.GetReferences)]
        public async Task<ActionResult<IEnumerable<Reference>>> GetReferences()
        {
            var userId = HttpContext.GetUserId();
            return await _context.References.Include(r => r.TypeOfReference).Where(r => r.UserId == userId).OrderBy(r => r.Name).ToListAsync();
        }

        // GET: api/References/5
        [HttpGet(Api.References.GetReference)]
        public async Task<ActionResult<Reference>> GetReference(int id)
        {
            var reference = await _context.References.FindAsync(id);

            if (reference == null)
            {
                return NotFound();
            }

            return reference;
        }

        // PUT: api/References/5
        [HttpPut(Api.References.PutReference)]
        public async Task<IActionResult> PutReference(int id, Reference reference)
        {
            if (id != reference.Id)
            {
                return BadRequest();
            }

            var userId = HttpContext.GetUserId();
            reference.UserId = userId;
            _context.Entry(reference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferenceExists(id))
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
        // POST: api/References
        [HttpPost(Api.References.PostReference)]
        public async Task<ActionResult<Reference>> PostReference(ReferenceCreateViewModel rcvm)
        {
            Reference newReference = new Reference
            {
                Name = rcvm.Name,
                Url = rcvm.Url,
                TypeOfReferenceId = rcvm.TypeOfReferenceId,
                UserId = HttpContext.GetUserId()
            };

            _context.References.Add(newReference);
            await _context.SaveChangesAsync();

            var foundReference = _context.References.Where(s => s.UserId == newReference.UserId).OrderByDescending(s => s.Id).Take(1);

            return Ok(foundReference);

        }

        // DELETE: api/References/5
        [HttpDelete(Api.References.DeleteReference)]
        public async Task<ActionResult<Reference>> DeleteReference(int id)
        {
            var reference = await _context.References.FindAsync(id);
            if (reference == null)
            {
                return NotFound();
            }

            _context.References.Remove(reference);
            await _context.SaveChangesAsync();

            return reference;
        }
        private bool ReferenceExists(int id)
        {
            return _context.References.Any(e => e.Id == id);
        }
    }
}
