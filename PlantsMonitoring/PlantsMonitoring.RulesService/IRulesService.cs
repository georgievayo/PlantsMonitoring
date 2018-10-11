using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.RulesService
{
    public interface IRulesService : IService
    {
        Task PostRule(Rule rule);

        List<Rule> GetAllRules();
    }
}
