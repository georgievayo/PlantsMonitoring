using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.DevicesService;
using PlantsMonitoring.Models;
using System;
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
                var devices = this.service.GetAll();

                return Ok(devices);
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }

        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Details(string id)
        {
            try
            {
                var device = this.service.GetDetails(id);

                if(device == null)
                {
                    return NotFound();
                }

                return Ok(device);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Post([FromBody]Device device)
        {
            try
            {
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
            var result = await this.service.GetSummarizedTelemetry();

            return Ok(result);
        }
    }
}
