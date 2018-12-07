using System;
using System.Runtime.Caching;

namespace PlantsMonitoring.UsersService.Cache
{
    public class SessionCache : ISessionCache
    {
        private readonly MemoryCache cache;

        public SessionCache(MemoryCache cache)
        {
            this.cache = cache;
        }

        public void AddItem(string key, string value, int expiration)
        {
            if (!string.IsNullOrEmpty(key) && !string.IsNullOrEmpty(value))
            {
                DateTimeOffset offset = new DateTimeOffset(DateTime.UtcNow.AddHours(expiration), TimeSpan.Zero);
                cache.Set(key, value, offset);
            }
        }

        public string GetItem(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return null;
            }

            var cacheValue = cache.Get(key).ToString();
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
