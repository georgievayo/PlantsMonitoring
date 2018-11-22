using System;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
using PlantsMonitoring.Data;
using PlantsMonitoring.TelemetryWebApi.SignalR;

namespace PlantsMonitoring.TelemetryWebApi
{
    internal static class Program
    {
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();
                ManagersConfigurator.Configure(builder);
                builder.RegisterType<TelemetryHub>()
                    .As<ITelemetryHub>()
                    .InstancePerLifetimeScope();

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<TelemetryWebApi>("PlantsMonitoring.TelemetryWebApiType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(TelemetryWebApi).Name);

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
