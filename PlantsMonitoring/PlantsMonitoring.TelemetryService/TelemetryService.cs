using System;
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

        public Task<List<Measurement>> GetSummarizedTelemetry()
        {
            var telemetry = this.dbContext.GetTelemetry()
                .ToList()
                .GroupBy(m => m.DeviceId);
            var dates = new List<DateTime>() { DateTime.Now.Subtract(new TimeSpan(5, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(4, 0, 0, 0)),
            DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(2, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(1, 0, 0, 0)), DateTime.Now};

            var result = new List<Measurement>();

            foreach (var deviceGroup in telemetry)
            {
                foreach (var date in dates)
                {
                    var maxDate = date.Add(new TimeSpan(24, 0, 0));
                    var telemetryByDate = deviceGroup.Where(m => m.ReceivedAt >= date
                    && m.ReceivedAt <= maxDate);

                    if(telemetryByDate.Count() > 0)
                    {
                        var averageTemperature = telemetryByDate.Average(m => m.Temperature);
                        var averageHumidity = telemetryByDate.Average(m => m.Humidity);
                        var averageLight = telemetryByDate.Average(m => m.Light);

                        var summarizedMeasurement = new Measurement()
                        {
                            Temperature = averageTemperature,
                            Humidity = averageHumidity,
                            Light = averageLight,
                            DeviceId = deviceGroup.Key,
                            ReceivedAt = date
                        };

                        result.Add(summarizedMeasurement);
                    }
                }
            }

            return Task.FromResult(result);
        }

        public Task<bool> IsOnline(string deviceId)
        {
            var lastMessage = this.dbContext.GetLastMessage(deviceId);
            var time = DateTime.Now.Subtract(new TimeSpan(0, 20, 0));
            if(lastMessage == null || lastMessage.ReceivedAt < time)
            {
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
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
