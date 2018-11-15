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
            var rules = this.dbContext.GetAllRules()
                .ToList();

            foreach (var rule in rules)
            {
                rule.Group = this.dbContext.GetGroupById(rule.GroupId);
            }

            return Task.FromResult(rules);
        }

        public async Task<Rule> PostRule(Rule rule)
        {
            var result = await this.dbContext.AddEntry(rule, DB_COLLECTION_NAME);
            rule.Id = result.Id;
            rule.Group = this.dbContext.GetGroupById(rule.GroupId);

            return rule;
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
