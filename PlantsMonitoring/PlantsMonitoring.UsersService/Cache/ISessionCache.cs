namespace PlantsMonitoring.UsersService.Cache
{
    public interface ISessionCache
    {
        void AddItem(string key, string value, int expiration);

        string GetItem(string key);

        void RemoveItem(string key);
    }
}
