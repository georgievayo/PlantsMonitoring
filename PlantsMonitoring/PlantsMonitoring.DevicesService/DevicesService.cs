using System.Collections.Generic;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using PlantsMonitoring.Models;
using System.Threading.Tasks;
using PlantsMonitoring.Data;
using System.Linq;
using System;

namespace PlantsMonitoring.DevicesService
{
    public class DevicesService : StatelessService, IDevicesService
    {
        private const string DEVICES_COLLECTION_NAME = "Devices";
        private readonly IDbContext dbContext;

        public DevicesService(StatelessServiceContext context, IDbContext dbContext)
            : base(context)
        {
            this.dbContext = dbContext;
        }

        public async Task<Device> CreateDevice(Device device)
        {
            var result = await this.dbContext.AddEntry(device, DEVICES_COLLECTION_NAME);
            device.Id = result.Id;

            return device;
        }

        public Task<List<Device>> GetAll()
        {
            var minTime = DateTime.Now.Subtract(new TimeSpan(0, 20, 0));
            var devices = this.dbContext.GetAllDevices()
                .ToList();

            foreach (var device in devices)
            {
                var lastMeasurement = this.dbContext.GetLastMessage(device.Id);
                var group = this.dbContext.GetGroupById(device.GroupId);
                device.LastMeasurement = lastMeasurement;
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

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
