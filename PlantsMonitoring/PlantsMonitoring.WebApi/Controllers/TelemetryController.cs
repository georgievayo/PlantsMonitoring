using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.Models;
using PlantsMonitoring.TelemetryService;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    public class TelemetryController : ApiController
    {
        private const string TELEMETRY_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.TelemetryService";

        private ITelemetryService service;

        public TelemetryController()
        {
            this.service = ServiceProxy.Create<ITelemetryService>(new Uri(TELEMETRY_SERVICE_URI));
        }

        public async Task<IHttpActionResult> Post([FromBody] Measurement measurement)
        {
            await this.service.PostMeasurement(measurement);
          
            return Ok();
        }
    }
}
