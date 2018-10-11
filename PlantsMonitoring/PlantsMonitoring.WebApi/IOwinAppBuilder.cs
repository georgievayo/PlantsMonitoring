using Owin;

namespace PlantsMonitoring.WebApi
{
    public interface IOwinAppBuilder
    {
        void Configuration(IAppBuilder appBuilder);
    }
}
