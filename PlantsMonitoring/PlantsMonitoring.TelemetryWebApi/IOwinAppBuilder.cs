using Owin;

namespace PlantsMonitoring.TelemetryWebApi
{
    public interface IOwinAppBuilder
    {
        void Configuration(IAppBuilder appBuilder);
    }
}
