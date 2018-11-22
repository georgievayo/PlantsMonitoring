using Autofac;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Data.Devices;
using PlantsMonitoring.Data.Groups;
using PlantsMonitoring.Data.Rules;
using PlantsMonitoring.Data.Telemetry;
using System;

namespace PlantsMonitoring.Data
{
    public class ManagersConfigurator
    {
        private const string ENDPOINT_URL = "https://plants-monitoring.documents.azure.com:443/";
        private const string PRIMARY_KEY = "";

        public static void Configure(ContainerBuilder builder)
        {
            builder.Register(c => new DocumentClient(new Uri(ENDPOINT_URL), PRIMARY_KEY))
                    .AsSelf()
                    .InstancePerLifetimeScope();
            builder.RegisterType<DevicesManager>()
                .As<IDevicesManager>()
                .InstancePerLifetimeScope();
            builder.RegisterType<GroupsManager>()
                .As<IGroupsManager>()
                .InstancePerLifetimeScope();
            builder.RegisterType<RulesManager>()
                .As<IRulesManager>()
                .InstancePerLifetimeScope();
            builder.RegisterType<TelemetryManager>()
                .As<ITelemetryManager>()
                .InstancePerLifetimeScope();
        }
    }
}
