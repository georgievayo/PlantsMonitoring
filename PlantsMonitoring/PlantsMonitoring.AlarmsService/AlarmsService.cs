using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data.Alarms;
using PlantsMonitoring.Data.Devices;
using PlantsMonitoring.Data.Rules;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.AlarmsService
{
    public class AlarmsService : StatelessService, IAlarmsService
    {
        private readonly IAlarmsManager manager;
        private readonly IRulesManager rulesManager;
        private readonly IDevicesManager devicesManager;

        public AlarmsService(StatelessServiceContext context, IAlarmsManager manager)
            : base(context)
        {
            this.manager = manager;
        }

        public Task<List<Alarm>> GetAll()
        {
            var alarms = this.manager.GetAll();

            return Task.FromResult(alarms);
        }

        public Task<List<Alarm>> GetAllByDevice(string deviceId)
        {
            var alarms = this.manager.GetAllByDevice(deviceId);

            return Task.FromResult(alarms);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        protected virtual async Task RunAsync(CancellationToken cancellationToken)
        {
            while(true)
            {
                var alarms = this.manager.GetAll();
                foreach (var alarm in alarms)
                {
                    var rule = this.rulesManager.GetById(alarm.RuleId);
                    var lastMessage = this.devicesManager.GetLastMessage(alarm.DeviceId);
                    if(ShouldDeleteAlarm(rule, lastMessage))
                    {
                        this.manager.Delete(alarm.Id);
                    }
                }

                await Task.Delay(TimeSpan.FromSeconds(20), cancellationToken);
            }
        }

        private bool ShouldDeleteAlarm(Rule rule, Measurement measurement) 
        {
            if(rule.Field == "Temperature")
            {
                return !IsBreakingRule(rule.Operator, measurement.Temperature, rule.Value);
            }
            else if(rule.Field == "Soil Moisture")
            {
                return !IsBreakingRule(rule.Operator, measurement.Humidity, rule.Value);
            }
            else if(rule.Field == "Light")
            {
                return !IsBreakingRule(rule.Operator, measurement.Light, rule.Value);
            }

            return false;
        }

        private bool IsBreakingRule(string @operator, double value, double criticalValue)
        {
            switch (@operator)
            {
                case ">=":
                    return value >= criticalValue;
                case ">":
                    return value > criticalValue;
                case "=":
                    return value == criticalValue;
                case "<=":
                    return value <= criticalValue;
                case "<":
                    return value < criticalValue;
                default:
                    return false;
            }
        }
    }
}
