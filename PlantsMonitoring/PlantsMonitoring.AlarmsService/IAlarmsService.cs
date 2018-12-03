using Microsoft.ServiceFabric.Services.Remoting;
using PlantsMonitoring.AlarmsService.Models;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.AlarmsService
{
    public interface IAlarmsService : IService
    {
        Task<List<Alarm>> GetAll();

        Task<List<Alarm>> GetAllByDevice(string deviceId);

        Task<List<AlarmsSummary>> GetSummarizedAlarms();
    }
}
