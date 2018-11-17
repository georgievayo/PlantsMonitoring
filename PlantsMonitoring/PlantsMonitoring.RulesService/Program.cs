using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Core;
using Autofac.Integration.ServiceFabric;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Data;

namespace PlantsMonitoring.RulesService
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
