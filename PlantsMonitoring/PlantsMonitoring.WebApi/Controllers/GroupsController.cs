﻿using Microsoft.ServiceFabric.Services.Remoting.Client;
using PlantsMonitoring.GroupsService;
using PlantsMonitoring.Models;
using System;
using System.Web.Http;

namespace PlantsMonitoring.WebApi.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupsController : ApiController
    {
        private const string GROUPS_SERVICE_URI = "fabric:/PlantsMonitoring/PlantsMonitoring.GroupsService";

        private readonly IGroupsService service;

        public GroupsController()
        {
            this.service = ServiceProxy.Create<IGroupsService>(new Uri(GROUPS_SERVICE_URI));
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                var devices = this.service.GetAll();

                return Ok(devices);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]Group group)
        {
            try
            {
                this.service.PostGroup(group);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
