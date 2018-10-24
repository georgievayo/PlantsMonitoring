using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.GroupsService
{
    public class GroupsService : StatelessService, IGroupsService
    {
        private const string GROUPS_COLLECTION_NAME = "Groups";
        private readonly IDbContext dbContext;

        public GroupsService(StatelessServiceContext context, IDbContext dbContext)
            : base(context)
        {
            this.dbContext = dbContext;
        }

        public async Task PostGroup(Group group)
        {
            var result = await this.dbContext.AddEntry(group, GROUPS_COLLECTION_NAME);
        }

        public Task<List<Group>> GetAll()
        {
            var result = this.dbContext.GetAllGroups()
                .ToList();

            return Task.FromResult(result);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
