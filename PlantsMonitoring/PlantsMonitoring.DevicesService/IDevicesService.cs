using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.DevicesService
{
    public interface IDevicesService : IService
    {
        Task CreateDevice(Device device);

        Task<List<Device>> GetAll();
    }
}
