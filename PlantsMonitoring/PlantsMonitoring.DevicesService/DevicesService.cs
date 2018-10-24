using System.Collections.Generic;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using PlantsMonitoring.Models;
using System.Threading.Tasks;
using PlantsMonitoring.Data;
using System.Linq;

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
            var result = this.dbContext.GetAllDevices()
                .ToList();

            return Task.FromResult(result);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
