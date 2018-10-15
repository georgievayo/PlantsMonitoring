using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.RulesService
{
    public class RulesService : StatelessService, IRulesService
    {
        private const string DB_COLLECTION_NAME = "Rules";
        private readonly IDbContext dbContext;

        public RulesService(StatelessServiceContext context, IDbContext dbContext)
            : base(context)
        {
            this.dbContext = dbContext;
        }

        public Task<List<Rule>> GetAllRules()
        {
            return Task.FromResult(this.dbContext.GetAllRules()
                .ToList());
        }

        public async Task PostRule(Rule rule)
        {
            await this.dbContext.AddEntry(rule, DB_COLLECTION_NAME);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
