using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.Models;
using PlantsMonitoring.UsersService;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly IUsersService service;

        public UsersController()
        {
            this.service = ServiceProxy.Create<IUsersService>(new Uri(Constants.USERS_SERVICE_URI));
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public async Task<IHttpActionResult> Login([FromBody]User user)
        {
            try
            {
                var token = await this.service.Login(user);
                if (!string.IsNullOrEmpty(token))
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

        private string ExtractTokenFromHeader()
        {
            var token = Request.Headers.Authorization.Parameter.Substring(6).Trim();
            return token;
        }
    }
}
