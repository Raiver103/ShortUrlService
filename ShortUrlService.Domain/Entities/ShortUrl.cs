using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace ShortUrlService.Domain.Entities
{
    public class ShortUrl
    {
        public int Id { get; set; }

        [Required]
        public string OriginalUrl { get; set; } = string.Empty;

        public string ShortenedUrl { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int ClickCount { get; set; } = 0;
    }
}
