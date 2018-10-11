using Owin;
using System.Fabric;
using System.Web.Http;

namespace PlantsMonitoring.WebApi
{
    public class Startup : IOwinAppBuilder
    {
        private readonly ConfigurationPackage CONFIG_PACKAGE;

        public Startup(ConfigurationPackage configPackage)
        {
            this.CONFIG_PACKAGE = configPackage;
        }

        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.Routes.MapHttpRoute(
                name: "PlantsMonitoringApi",
                routeTemplate: "api/{controller}",
                defaults: new { controller = "TelemetryController" }
            );

            appBuilder.UseWebApi(config);
        }
    }
}
