using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.AlarmsService;
using PlantsMonitoring.Common;
using System;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/alarms")]
    public class AlarmsController : ApiController
    {
        private readonly IAlarmsService service;

        public AlarmsController()
        {
            this.service = ServiceProxy.Create<IAlarmsService>(new Uri(Constants.ALARMS_SERVICE_URI));
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                var alarms = this.service.GetAll();

                return Ok(alarms);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult GetAlarmsByDevice(string id)
        {
            try
            {
                var alarms = this.service.GetAllByDevice(id);

                return Ok(alarms);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Route("summary")]
        [HttpGet]
        public IHttpActionResult GetAlarmsSummary()
        {
            try
            {
                var alarms = this.service.GetSummarizedAlarms();

                return Ok(alarms);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
