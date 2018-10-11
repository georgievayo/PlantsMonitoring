using System;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Data;

namespace PlantsMonitoring.TelemetryService
{
    internal static class Program
    {
        private const string ENDPOINT_URL = "https://plants-monitoring.documents.azure.com:443/";
        private const string PRIMARY_KEY = "";

        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();

                builder.RegisterType<DbContext>()
                    .As<IDbContext>()
                    .InstancePerRequest();
                builder.Register(c => new DocumentClient(new Uri(ENDPOINT_URL), PRIMARY_KEY))
                    .AsSelf()
                    .InstancePerRequest();
                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<TelemetryService>("PlantsMonitoring.TelemetryServiceType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(TelemetryService).Name);

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
