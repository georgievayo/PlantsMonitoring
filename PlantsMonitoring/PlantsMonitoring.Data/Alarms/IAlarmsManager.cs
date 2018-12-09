using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Alarms
{
    public interface IAlarmsManager
    {
        List<Alarm> GetAll(IEnumerable<string> devicesIds);

        List<Alarm> GetAllByDevice(string deviceId);

        Task Delete(Alarm alarm);
    }
}
