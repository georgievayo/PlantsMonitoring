﻿using System;
using System.Diagnostics;
using System.Runtime.Caching;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;
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
                builder.Register(o => new MemoryCache("PlantsMonitoring"))
                    .InstancePerLifetimeScope();
                builder.RegisterType<SessionCache>()
                    .As<ISessionCache>()
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
