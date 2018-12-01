using PlantsMonitoring.Models;
using System.Collections.Generic;

namespace PlantsMonitoring.Data.Alarms
{
    public interface IAlarmsManager
    {
        List<Alarm> GetAll();

        List<Alarm> GetAllByDevice(string deviceId);

        void Delete(string alarmId);
    }
}
