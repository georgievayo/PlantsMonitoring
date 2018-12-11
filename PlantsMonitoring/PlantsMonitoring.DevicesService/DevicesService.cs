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
            device.Group = this.groupsManager.GetGroupById(device.GroupId);
            return device;
        }

        public Task<DeviceExtended> GetDetails(string deviceId)
        {
            var device = this.devicesManager.GetExtendedDeviceById(deviceId);
            if (device != null)
            {
                device.Group = this.groupsManager.GetGroupById(device.GroupId);
                device.Telemetry = this.devicesManager.GetDeviceTelemetry(deviceId);
                device.Rules = this.rulesManager.GetGroupRules(device.GroupId);
                device.Alarms = this.alarmsManager.GetAllByDevice(deviceId);
            }

            return Task.FromResult(device);
        }

        public Task<List<Device>> GetAll(string userId)
        {
            var minTime = DateTime.Now.Subtract(new TimeSpan(0, 20, 0));
            var devices = this.devicesManager.GetAll(userId);

            foreach (var device in devices)
            {
                var lastMeasurement = this.devicesManager.GetLastMessage(device.Id);
                device.LastMeasurement = lastMeasurement;

                var group = this.groupsManager.GetGroupById(device.GroupId);
                device.Group = group;

                if (lastMeasurement == null || lastMeasurement.ReceivedAt < minTime)
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

        public Task<List<Measurement>> GetSummarizedTelemetry(IEnumerable<string> devicesIds)
        {
            var days = new TimeSpan(5, 0, 0, 0);
            var minDate = DateTime.Now.Subtract(days).Date;

            var telemetry = this.devicesManager.GetTelemetry(devicesIds)
                .GroupBy(m => new { m.DeviceId, m.ReceivedAt.Value.Date })
                .Select(m => new Measurement()
                {
                    DeviceId = m.Key.DeviceId,
                    ReceivedAt = m.Key.Date,
                    Temperature = m.ToList().Average(x => x.Temperature),
                    Humidity = m.ToList().Average(x => x.Humidity),
                    Light = m.ToList().Average(x => x.Light)
                })
                .Where(m => m.ReceivedAt >= minDate)
                .ToList();

            return Task.FromResult(telemetry);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            while (true)
            {
                var devices = this.devicesManager.GetAll();
                foreach (var device in devices)
                {
                    var lastMessage = this.devicesManager.GetLastMessage(device.Id);
                    if(lastMessage != null)
                    {
                        if (lastMessage.ReceivedAt < DateTime.Now.Subtract(new TimeSpan(0, 20, 0)))
                        {
                            device.Status = DeviceStatus.Offline;
                        }
                        else
                        {
                            device.Status = DeviceStatus.Online;
                        }

                        await this.devicesManager.Update(device);
                    }
                }

                await Task.Delay(TimeSpan.FromSeconds(20), cancellationToken);
            }
        }
    }
}
