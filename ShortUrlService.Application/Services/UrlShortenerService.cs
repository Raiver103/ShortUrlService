using System.Text;
using System.Security.Cryptography;

namespace ShortUrlService.Application.Services
{
    public class UrlShortenerService
    {
        public static string GenerateShortUrl(string inputUrl)
        {
            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputUrl + Guid.NewGuid()));
                return Convert.ToBase64String(hash)
                    .Replace("/", "_")
                    .Replace("+", "-")
                    .Substring(0, 8);
            }
        }
    }
}
