﻿using Microsoft.Azure.Documents;
using PlantsMonitoring.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Devices
{
    public interface IDevicesManager
    {
        Task<Document> Add(Device device);

        List<Device> GetAll(string userId);

        List<Device> GetAll();

        List<Measurement> GetTelemetry(IEnumerable<string> devicesIds);

        Measurement GetLastMessage(string deviceId);

        List<Measurement> GetLastMessages(string deviceId);

        DeviceExtended GetExtendedDeviceById(string deviceId);

        Device GetDeviceById(string deviceId);

        List<Measurement> GetDeviceTelemetry(string deviceId);

        Task Update(Device device);
    }
}
