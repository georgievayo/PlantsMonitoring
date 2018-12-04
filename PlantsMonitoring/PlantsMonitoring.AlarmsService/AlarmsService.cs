using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.AlarmsService.Models;
using PlantsMonitoring.Data.Alarms;
using PlantsMonitoring.Data.Devices;
using PlantsMonitoring.Data.Rules;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.AlarmsService
{
    public class AlarmsService : StatelessService, IAlarmsService
    {
        private readonly IAlarmsManager alarmsManager;
        private readonly IRulesManager rulesManager;
        private readonly IDevicesManager devicesManager;

        public AlarmsService(StatelessServiceContext context,
            IAlarmsManager alarmsManager,
            IRulesManager rulesManager,
            IDevicesManager devicesManager)
            : base(context)
        {
            this.alarmsManager = alarmsManager;
            this.rulesManager = rulesManager;
            this.devicesManager = devicesManager;
        }

        public Task<List<Alarm>> GetAll()
        {
            var alarms = this.alarmsManager.GetAll()
                            .Where(a => a.IsDeleted == false)
                            .ToList();

            foreach (var alarm in alarms)
            {
                alarm.Device = this.devicesManager.GetDeviceById(alarm.DeviceId);
                alarm.Rule = this.rulesManager.GetById(alarm.RuleId);
            }

            return Task.FromResult(alarms);
        }

        public Task<List<AlarmsSummary>> GetSummarizedAlarms()
        {
            var alarmsSummary = this.alarmsManager.GetAll()
                .GroupBy(x => x.RaisedAt.Date)
                .Select(x => new AlarmsSummary() { Date = x.Key, Count = x.Count() })
                .ToList();

            return Task.FromResult(alarmsSummary);
        }

        public Task<List<Alarm>> GetAllByDevice(string deviceId)
        {
            var alarms = this.alarmsManager.GetAllByDevice(deviceId);

            return Task.FromResult(alarms);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        //protected override async Task RunAsync(CancellationToken cancellationToken)
        //{
        //    while (true)
        //    {
        //        cancellationToken.ThrowIfCancellationRequested();

        //        var alarms = this.alarmsManager.GetAll();
        //        foreach (var alarm in alarms)
        //        {
        //            var rule = this.rulesManager.GetById(alarm.RuleId);
        //            var lastMessage = this.devicesManager.GetLastMessage(alarm.DeviceId);
        //            if (ShouldDeleteAlarm(rule, lastMessage))
        //            {
        //                await this.alarmsManager.Delete(alarm);
        //            }
        //        }

        //        await Task.Delay(TimeSpan.FromSeconds(20), cancellationToken);
        //    }
        //}

        private bool ShouldDeleteAlarm(Rule rule, Measurement measurement)
        {
            if (rule.Field == "Temperature")
            {
                return !IsBreakingRule(rule.Operator, measurement.Temperature, rule.Value);
            }
            else if (rule.Field == "Soil Moisture")
            {
                return !IsBreakingRule(rule.Operator, measurement.Humidity, rule.Value);
            }
            else if (rule.Field == "Light")
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
