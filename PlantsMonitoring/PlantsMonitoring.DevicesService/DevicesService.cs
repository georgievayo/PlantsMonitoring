using System.Collections.Generic;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using PlantsMonitoring.Models;
using System.Threading.Tasks;
using PlantsMonitoring.Data.Devices;
using System;
using PlantsMonitoring.Data.Rules;
using PlantsMonitoring.Data.Groups;
using System.Linq;
using PlantsMonitoring.Data.Alarms;
using System.Threading;

namespace PlantsMonitoring.DevicesService
{
    public class DevicesService : StatelessService, IDevicesService
    {
        private readonly IDevicesManager devicesManager;
        private readonly IRulesManager rulesManager;
        private readonly IGroupsManager groupsManager;
        private readonly IAlarmsManager alarmsManager;

        public DevicesService(StatelessServiceContext context, 
            IDevicesManager devicesManager, 
            IRulesManager rulesManager,
            IGroupsManager groupsManager,
            IAlarmsManager alarmsManager)
            : base(context)
        {
            this.devicesManager = devicesManager;
            this.rulesManager = rulesManager;
            this.groupsManager = groupsManager;
            this.alarmsManager = alarmsManager;
        }

        public async Task<Device> CreateDevice(Device device)
        {
            var result = await this.devicesManager.Add(device);
            device.Id = result.Id;

            return device;
        }

        public Task<DeviceExtended> GetDetails(string deviceId)
        {
            var device = this.devicesManager.GetExtendedDeviceById(deviceId);
            if(device != null)
            {
                device.Group = this.groupsManager.GetGroupById(device.GroupId);
                device.Telemetry = this.devicesManager.GetDeviceTelemetry(deviceId);
                device.Rules = this.rulesManager.GetGroupRules(device.GroupId);
                device.Alarms = this.alarmsManager.GetAllByDevice(deviceId);
            }

            return Task.FromResult(device);
        }

        public Task<List<Device>> GetAll()
        {
            var minTime = DateTime.Now.Subtract(new TimeSpan(0, 20, 0));
            var devices = this.devicesManager.GetAll();

            foreach (var device in devices)
            {
                var lastMeasurement = this.devicesManager.GetLastMessage(device.Id);
                device.LastMeasurement = lastMeasurement;

                var group = this.groupsManager.GetGroupById(device.GroupId);
                device.Group = group;

                if(lastMeasurement == null || lastMeasurement.ReceivedAt < minTime)
                {
                    device.Status = DeviceStatus.Offline;
                }
                else
                {
                    device.Status = DeviceStatus.Online;
                }
            }

            return Task.FromResult(devices);
        }

        public Task<List<Measurement>> GetLastMeasurements(string deviceId)
        {
            var result = this.devicesManager.GetLastMessages(deviceId);

            return Task.FromResult(result);
        }

        public Task<List<Measurement>> GetSummarizedTelemetry()
        {
            var telemetry = this.devicesManager.GetTelemetry()
                .GroupBy(m => m.DeviceId);
            var dates = new List<DateTime>() { DateTime.Now.Subtract(new TimeSpan(5, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(4, 0, 0, 0)),
            DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(2, 0, 0, 0)), DateTime.Now.Subtract(new TimeSpan(1, 0, 0, 0)), DateTime.Now};

            var result = new List<Measurement>();

            foreach (var deviceGroup in telemetry)
            {
                foreach (var date in dates)
                {
                    var maxDate = date.Add(new TimeSpan(24, 0, 0));
                    var telemetryByDate = deviceGroup.Where(m => m.ReceivedAt >= date
                    && m.ReceivedAt <= maxDate);

                    if (telemetryByDate.Count() > 0)
                    {
                        var averageTemperature = telemetryByDate.Average(m => m.Temperature);
                        var averageHumidity = telemetryByDate.Average(m => m.Humidity);
                        var averageLight = telemetryByDate.Average(m => m.Light);

                        var summarizedMeasurement = new Measurement()
                        {
                            Temperature = averageTemperature,
                            Humidity = averageHumidity,
                            Light = averageLight,
                            DeviceId = deviceGroup.Key,
                            ReceivedAt = date
                        };

                        result.Add(summarizedMeasurement);
                    }
                }
            }
            //var result = this.devicesManager.GetTelemetry();
            return Task.FromResult(result);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        protected virtual async Task RunAsync(CancellationToken cancellationToken)
        {
            while (true)
            {
                var devices = this.devicesManager.GetAll();
                foreach (var device in devices)
                {
                    var lastMessage = this.devicesManager.GetLastMessage(device.Id);
                    if (lastMessage.ReceivedAt < DateTime.Now.Subtract(new TimeSpan(0, 20, 0)))
                    {
                        device.Status = DeviceStatus.Offline;
                    }
                    else
                    {
                        device.Status = DeviceStatus.Online;
                    }

                    await this.devicesManager.UpdateStatus(device);
                }

                await Task.Delay(TimeSpan.FromSeconds(20), cancellationToken);
            }
        }
    }
}
