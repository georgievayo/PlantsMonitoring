using System;
using System.Diagnostics;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;
using Autofac;
using Autofac.Integration.ServiceFabric;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data;

namespace PlantsMonitoring.AlarmsService
{
    internal static class Program
    {
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();

                ManagersConfigurator.Configure(builder);

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<AlarmsService>("PlantsMonitoring.AlarmsServiceType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(AlarmsService).Name);

                    Thread.Sleep(Timeout.Infinite);
                }
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.ServiceHostInitializationFailed(e.ToString());
                throw;
            }
        }
    }
}
