using Microsoft.AspNet.SignalR;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.TelemetryWebApi.SignalR
{
    public class TelemetryHub : Hub, ITelemetryHub
    {
        private readonly IHubContext hubContext;
        public TelemetryHub()
        {
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<TelemetryHub>();
        }
        
        public void SendMessage(Measurement measurement)
        {
            this.hubContext.Clients.All.acknowledgeMessage(measurement);
        }
    }
}
