using Microsoft.EntityFrameworkCore;
using ShortUrlService.Domain.Entities;

namespace ShortUrlService.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<ShortUrl> ShortUrls { get; set; }
    }
}
