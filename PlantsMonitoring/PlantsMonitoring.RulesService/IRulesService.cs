using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.RulesService
{
    public interface IRulesService : IService
    {
        Task<Rule> PostRule(Rule rule);

        Task<List<Rule>> GetAllRules();
    }
}
