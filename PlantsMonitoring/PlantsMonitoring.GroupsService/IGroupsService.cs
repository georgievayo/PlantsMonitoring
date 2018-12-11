using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.GroupsService
{
    public interface IGroupsService : IService
    {
        Task<Group> PostGroup(Group group);

        Task<List<Group>> GetAll(string userId);
    }
}
