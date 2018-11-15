using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Models;
using PlantsMonitoring.RulesService;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    public class RulesController : ApiController
    {
        private const string RULES_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.RulesService";

        private IRulesService service;

        public RulesController()
        {
            this.service = ServiceProxy.Create<IRulesService>(new Uri(RULES_SERVICE_URI));
        }

        public async Task<IHttpActionResult> Post([FromBody] Rule rule)
        {
            var createdRule = await this.service.PostRule(rule);

            return Ok(createdRule);
        }

        public async Task<IHttpActionResult> Get()
        {
            var rules = await this.service.GetAllRules();

            return Ok(rules);
        }
    }
}
