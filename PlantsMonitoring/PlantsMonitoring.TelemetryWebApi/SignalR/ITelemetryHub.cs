using PlantsMonitoring.Models;

namespace PlantsMonitoring.TelemetryWebApi.SignalR
{
    public interface ITelemetryHub
    {
        void SendMessage(Measurement measurement);
    }
}
