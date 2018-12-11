using System.Collections.Generic;
using System.Fabric;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data.Groups;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.GroupsService
{
    public class GroupsService : StatelessService, IGroupsService
    {
        private readonly IGroupsManager groupsManager;

        public GroupsService(StatelessServiceContext context, IGroupsManager groupsManager)
            : base(context)
        {
            this.groupsManager = groupsManager;
        }

        public async Task<Group> PostGroup(Group group)
        {
            var result = await this.groupsManager.Add(group);
            group.Id = result.Id;

            return group;
        }

        public Task<List<Group>> GetAll(string userId)
        {
            var result = this.groupsManager.GetAll(userId);

            return Task.FromResult(result);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
