using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.DevicesService
{
    public interface IDevicesService : IService
    {
        Task<Device> CreateDevice(Device device);

        Task<List<Device>> GetAll();

        Task<DeviceExtended> GetDetails(string deviceId);

        Task<List<Measurement>> GetSummarizedTelemetry();
    }
}
