using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.DevicesService;
using PlantsMonitoring.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/devices")]
    public class DevicesController : ApiController
    {
        private readonly IDevicesService service;

        public DevicesController()
        {
            this.service = ServiceProxy.Create<IDevicesService>(new Uri(Constants.DEVICES_SERVICE_URI));
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                var devices = this.service.GetAll(currentUserId);

                return Ok(devices);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Details(string id)
        {
            try
            {
                if(string.IsNullOrEmpty(id))
                {
                    return BadRequest("Device id is required.");
                }

                var device = this.service.GetDetails(id);

                if(device == null)
                {
                    return NotFound();
                }

                return Ok(device);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Post([FromBody]Device device)
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                device.UserId = currentUserId;
                device.Status = DeviceStatus.Offline;
                var createdDevice = await this.service.CreateDevice(device);

                return Ok(createdDevice);
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("telemetry")]
        public async Task<IHttpActionResult> Telemetry()
        {
            try
            {
                var currentUserId = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault().Value;
                var devices = await this.service.GetAll(currentUserId);
                var devicesIds = devices.Select(d => d.Id);
                var result = await this.service.GetSummarizedTelemetry(devicesIds);

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
