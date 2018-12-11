using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Threading.Tasks;

namespace PlantsMonitoring.UsersService
{
    public interface IUsersService : IService
    {
        Task<string> Login(User user);

        Task<User> CreateUser(User user);

        Task<bool> ValidateToken(string token);
    }
}
