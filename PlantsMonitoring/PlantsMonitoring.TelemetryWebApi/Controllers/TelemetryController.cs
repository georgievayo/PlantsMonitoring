using PlantsMonitoring.Data.Telemetry;
using PlantsMonitoring.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlantsMonitoring.TelemetryWebApi.Controllers
{
    [RoutePrefix("api/telemetry")]
    public class TelemetryController : ApiController
    {
        private readonly ITelemetryManager telemetryManager;

        public TelemetryController(ITelemetryManager telemetryManager)
        {
            this.telemetryManager = telemetryManager;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Measurement measurement)
        {
            var createdMeasurement = await this.telemetryManager.Add(measurement);

            return Ok(createdMeasurement);
        }
    }
}
