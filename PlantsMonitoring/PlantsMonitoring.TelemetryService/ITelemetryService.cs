using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.TelemetryService
{
    public interface ITelemetryService : IService
    {
        Task PostMeasurement(Measurement measurement);

        //List<Measurement> GetLastMeasurements(string deviceId);
    }
}
