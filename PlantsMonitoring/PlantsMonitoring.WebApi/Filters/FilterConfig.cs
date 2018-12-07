using Autofac;
using System.Web.Http.Filters;

namespace PlantsMonitoring.WebApi.Filters
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(HttpFilterCollection filters, IContainer container)
        {
            filters.Add(container.ResolveNamed<IAuthenticationFilter>("AuthFilter"));
        }
    }
}
