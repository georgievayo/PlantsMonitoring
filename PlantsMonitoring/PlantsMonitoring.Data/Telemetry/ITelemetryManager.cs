using Microsoft.Azure.Documents;
using PlantsMonitoring.Models;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Telemetry
{
    public interface ITelemetryManager
    {
        Task<Document> Add(Measurement measurement);
    }
}
