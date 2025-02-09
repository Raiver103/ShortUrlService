using Microsoft.AspNetCore.Mvc;
using ShortUrlService.Application.Services;
using ShortUrlService.Domain.Entities;
using ShortUrlService.Infrastructure.Data;

namespace ShortUrlService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShortUrlController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShortUrlController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.ShortUrls.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string originalUrl)
        {
            if (string.IsNullOrWhiteSpace(originalUrl))
            {
                return BadRequest("URL не может быть пустым");
            }

            var shortUrl = new ShortUrl
            {
                OriginalUrl = originalUrl,
                ShortenedUrl = UrlShortenerService.GenerateShortUrl(originalUrl)
            };

            _context.ShortUrls.Add(shortUrl);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = shortUrl.Id }, shortUrl);
        }


        [HttpGet("{shortUrl}")]
        public async Task<IActionResult> RedirectToOriginal(string shortUrl)
        {
            var entry = _context.ShortUrls.FirstOrDefault(u => u.ShortenedUrl == shortUrl);
            if (entry == null)
                return NotFound();

            entry.ClickCount++;
            await _context.SaveChangesAsync();
            return Redirect(entry.OriginalUrl);
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDetails(int id)
        {
            var entry = await _context.ShortUrls.FindAsync(id);
            if (entry == null)
                return NotFound();
            return Ok(entry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] string newOriginalUrl)
        {
            var entry = await _context.ShortUrls.FindAsync(id);
            if (entry == null)
                return NotFound();

            entry.OriginalUrl = newOriginalUrl;
            await _context.SaveChangesAsync();
            return Ok(entry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _context.ShortUrls.FindAsync(id);
            if (entry != null)
            {
                _context.ShortUrls.Remove(entry);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
