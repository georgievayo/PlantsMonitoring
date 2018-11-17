﻿using Owin;
using System.Fabric;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PlantsMonitoring.WebApi
{
    public class Startup : IOwinAppBuilder
    {
        private readonly ConfigurationPackage CONFIG_PACKAGE;

        public Startup(ConfigurationPackage configPackage)
        {
            this.CONFIG_PACKAGE = configPackage;
        }

        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.Routes.MapHttpRoute(
                name: "PlantsMonitoringApi",
                routeTemplate: "api/{controller}",
                defaults: new { controller = "DevicesController" }
            );
            var corsAttr = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttr);

            appBuilder.UseWebApi(config);
        }
    }
}
