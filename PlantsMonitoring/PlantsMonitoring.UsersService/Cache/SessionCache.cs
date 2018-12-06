using Microsoft.Extensions.Caching.Memory;
using System;

namespace PlantsMonitoring.UsersService.Cache
{
    public class SessionCache : ISessionCache
    {
        private readonly IMemoryCache cache;

        public SessionCache(IMemoryCache cache)
        {
            this.cache = cache;
        }

        public void AddItem(string key, string value, int expiration)
        {
            if (!string.IsNullOrEmpty(key) && !string.IsNullOrEmpty(value))
            {
                var options = new MemoryCacheEntryOptions()
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(expiration)
                };

                cache.Set(key, value, options);
            }
        }

        public string GetItem(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return null;
            }

            var cacheValue = cache.Get<string>(key);
            return cacheValue;
        }

        public void RemoveItem(string key)
        {
            if (!string.IsNullOrEmpty(key))
            {
                cache.Remove(key);
            }
        }
    }
}
