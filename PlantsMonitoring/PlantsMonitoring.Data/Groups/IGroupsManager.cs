using Microsoft.Azure.Documents;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Groups
{
    public interface IGroupsManager
    {
        Task<Document> Add(Group group);

        List<Group> GetAll(string userId);

        Group GetGroupById(string groupId);
    }
}
