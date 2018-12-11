using System.Collections.Generic;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;

namespace PlantsMonitoring.WebApi
{
    internal sealed class WebApi : StatelessService
    {
        public WebApi(StatelessServiceContext context)
            : base(context)
        {
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new[]
            {
                new ServiceInstanceListener(initParams => new OwinCommunicationListener(new Startup(), initParams))
            };
        }
    }
}
