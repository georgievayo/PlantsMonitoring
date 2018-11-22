using System.Collections.Generic;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;

namespace PlantsMonitoring.TelemetryWebApi
{
    public class TelemetryWebApi : StatelessService
    {
        private readonly ConfigurationPackage CONFIG_PACKAGE;

        public TelemetryWebApi(StatelessServiceContext context)
            : base(context)
        {
            this.CONFIG_PACKAGE = context.CodePackageActivationContext.GetConfigurationPackageObject("Config");
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new[]
            {
                new ServiceInstanceListener(initParams => new OwinCommunicationListener(new Startup(this.CONFIG_PACKAGE), initParams))
            };
        }
    }
}
