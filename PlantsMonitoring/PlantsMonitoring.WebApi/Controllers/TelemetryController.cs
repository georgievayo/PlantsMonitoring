using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.DevicesService;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    public class TelemetryController : ApiController
    {
        private const string DEVICES_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.DevicesService";

        private IDevicesService service;

        public TelemetryController()
        {
            this.service = ServiceProxy.Create<IDevicesService>(new Uri(DEVICES_SERVICE_URI));
        }

        public async Task<IHttpActionResult> Get()
        {
            var result = await this.service.GetSummarizedTelemetry();

            return Ok(result);
        }
    }
}
