using PlantsMonitoring.Data.Telemetry;
using PlantsMonitoring.Models;
using PlantsMonitoring.TelemetryWebApi.SignalR;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.TelemetryWebApi.Controllers
{
    [RoutePrefix("api/telemetry")]
    public class TelemetryController : ApiController
    {
        private readonly ITelemetryManager telemetryManager;
        private readonly ITelemetryHub hub;

        public TelemetryController(ITelemetryManager telemetryManager, ITelemetryHub hub)
        {
            this.telemetryManager = telemetryManager;
            this.hub = hub;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Measurement measurement)
        {
            var createdMeasurement = await this.telemetryManager.Add(measurement);
            measurement.Id = createdMeasurement.Id;
            this.hub.SendMessage(measurement);

            return Ok(createdMeasurement);
        }
    }
}
