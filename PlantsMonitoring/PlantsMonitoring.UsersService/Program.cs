using System;
using System.Diagnostics;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
using Microsoft.Extensions.Caching.Memory;
using PlantsMonitoring.Data;
using PlantsMonitoring.UsersService.Cache;

namespace PlantsMonitoring.UsersService
{
    internal static class Program
    {
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();
                
                ManagersConfigurator.Configure(builder);
                builder.RegisterType<SessionCache>()
                    .As<ISessionCache>()
                    .InstancePerLifetimeScope();
                builder.RegisterType<MemoryCache>()
                    .As<IMemoryCache>()
                    .InstancePerLifetimeScope();


                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<UsersService>("PlantsMonitoring.UsersServiceType");

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(UsersService).Name);

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
