using System;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Data;

namespace PlantsMonitoring.GroupsService
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
                builder.RegisterStatelessService<GroupsService>("PlantsMonitoring.GroupsServiceType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(GroupsService).Name);

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
