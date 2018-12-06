using Microsoft.ServiceFabric.Services.Remoting.Client;
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

        [HttpPost]
        [Route("auth")]
        public async Task<IHttpActionResult> Authenticate()
        {
            try
            {
                var token = ExtractTokenFromHeader();
                if(token != null)
                {
                    var isValid = await this.service.ValidateToken(token);
                    if(isValid)
                    {
                        return Ok();
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private string ExtractTokenFromHeader()
        {
            var authHeader = Request.Headers.Authorization;
            if (authHeader != null)
            {
                var authScheme = authHeader.Scheme;
                if(authScheme == "Bearer")
                {
                    var token = authHeader.Parameter.Substring(6).Trim();

                    return token;
                }
            }

            return null;
        }
    }
}
