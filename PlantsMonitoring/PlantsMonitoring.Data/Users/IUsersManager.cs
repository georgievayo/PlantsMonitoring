using Microsoft.Azure.Documents;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Users
{
    public interface IUsersManager
    {
        Task<Document> Add(Models.User user);

        Models.User GetUser(string username, string password);
    }
}
