using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data.Groups;
using PlantsMonitoring.Data.Rules;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.RulesService
{
    public class RulesService : StatelessService, IRulesService
    {
        private readonly IRulesManager rulesManager;
        private readonly IGroupsManager groupsManager;

        public RulesService(StatelessServiceContext context, 
            IRulesManager rulesManager, 
            IGroupsManager groupsManager)
            : base(context)
        {
            this.rulesManager = rulesManager;
            this.groupsManager = groupsManager;
        }

        public Task<List<Rule>> GetAllRules(string userId)
        {
            var groups = this.groupsManager.GetAll(userId).Select(g => g.Id);
            var rules = this.rulesManager.GetAll(groups);

            foreach (var rule in rules)
            {
                rule.Group = this.groupsManager.GetGroupById(rule.GroupId);
            }

            return Task.FromResult(rules);
        }

        public async Task<Rule> PostRule(Rule rule)
        {
            var result = await this.rulesManager.Add(rule);
            rule.Id = result.Id;
            rule.Group = this.groupsManager.GetGroupById(rule.GroupId);

            return rule;
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
