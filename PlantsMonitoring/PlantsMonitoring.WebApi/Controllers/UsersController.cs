using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Models;
using PlantsMonitoring.UsersService;
using System;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private const string USERS_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.UsersService";
        private readonly IUsersService service;

        public UsersController()
        {
            this.service = ServiceProxy.Create<IUsersService>(new Uri(USERS_SERVICE_URI));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Register([FromBody]User user)
        {
            try
            {
                var createdUser = this.service.CreateUser(user);

                return Ok(createdUser);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody]User user)
        {
            try
            {
                var token = this.service.Login(user);
                if(token != null)
                {
                    return Ok(new { token });
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
