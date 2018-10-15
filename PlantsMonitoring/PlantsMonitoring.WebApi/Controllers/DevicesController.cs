using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.DevicesService;
using PlantsMonitoring.Models;
using System;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    public class DevicesController : ApiController
    {
        private const string DEVICES_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.DevicesService";

        private readonly IDevicesService service;
        public DevicesController()
        {
            this.service = ServiceProxy.Create<IDevicesService>(new Uri(DEVICES_SERVICE_URI));
        }

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

        public IHttpActionResult Post([FromBody]Device device)
        {
            try
            {
                this.service.CreateDevice(device);
                return Ok();
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }
    }
}
