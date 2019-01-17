using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Owin;
using PlantsMonitoring.Common;
using PlantsMonitoring.UsersService;
using PlantsMonitoring.WebApi.Filters;
using System;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Filters;

namespace PlantsMonitoring.WebApi
{
    public class Startup : IOwinAppBuilder
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var builder = new ContainerBuilder();
            builder.Register(c => ServiceProxy.Create<IUsersService>(new Uri(Constants.USERS_SERVICE_URI)));
            builder.RegisterType<AuthFilter>()
                .Named<IAuthenticationFilter>("AuthFilter");
            var container = builder.Build();

            HttpConfiguration config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            FilterConfig.RegisterGlobalFilters(config.Filters, container);

            var corsAttr = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttr);

            appBuilder.UseWebApi(config);
        }
    }
}
