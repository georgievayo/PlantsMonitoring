using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.Models;
using PlantsMonitoring.RulesService;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/rules")]
    public class RulesController : ApiController
    {
        private IRulesService service;

        public RulesController()
        {
            this.service = ServiceProxy.Create<IRulesService>(new Uri(Constants.RULES_SERVICE_URI));
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Post([FromBody] Rule rule)
        {
            try
            {
                var createdRule = await this.service.PostRule(rule);

                return Ok(createdRule);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                var rules = await this.service.GetAllRules(currentUserId);

                return Ok(rules);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
