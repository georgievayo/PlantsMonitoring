using Microsoft.Azure.Documents;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Rules
{
    public interface IRulesManager
    {
        Task<Document> Add(Rule rule);

        List<Rule> GetAll();

        List<Rule> GetGroupRules(string groupId);

        Rule GetById(string id);
    }
}
