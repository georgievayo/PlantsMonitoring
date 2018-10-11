using System;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Data;

namespace PlantsMonitoring.RulesService
{
    internal static class Program
    {
        private const string ENDPOINT_URL = "https://plants-monitoring.documents.azure.com:443/";
        private const string PRIMARY_KEY = "ima6sUPQ97PtEfvz76LL2Ch9LaBnsMmycyRCNOCUWVzJ83vS0fRgDxUG8oIXGV9QoZEKqzrwQBwvfeLV6cbREA==";

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
                    .InstancePerLifetimeScope();

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<RulesService>("PlantsMonitoring.RulesServiceType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(RulesService).Name);

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
