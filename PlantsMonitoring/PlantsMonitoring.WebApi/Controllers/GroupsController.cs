using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.GroupsService;
using PlantsMonitoring.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupsController : ApiController
    {
        private readonly IGroupsService service;

        public GroupsController()
        {
            this.service = ServiceProxy.Create<IGroupsService>(new Uri(Constants.GROUPS_SERVICE_URI));
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                var groups = this.service.GetAll(currentUserId);

                return Ok(groups);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Post([FromBody]Group group)
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                group.UserId = currentUserId;
                var createdGroup = await this.service.PostGroup(group);

                return Ok(createdGroup);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
