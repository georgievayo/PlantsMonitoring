using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.TelemetryService
{
    public class TelemetryService : StatelessService, ITelemetryService
    {
        private const string DB_COLLECTION_NAME = "Telemetry";
        private readonly IDbContext dbContext;

        public TelemetryService(StatelessServiceContext context, IDbContext dbContext)
            : base(context)
        {
            this.dbContext = dbContext;
        }

        public Task<List<Measurement>> GetLastMeasurements(string deviceId)
        {
            var result = this.dbContext.GetLastDocuments(deviceId, DB_COLLECTION_NAME)
               .ToList();

            return Task.FromResult(result);
        }

        public async Task PostMeasurement(Measurement measurement)
        {
            await this.dbContext.AddEntry(measurement, DB_COLLECTION_NAME);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
