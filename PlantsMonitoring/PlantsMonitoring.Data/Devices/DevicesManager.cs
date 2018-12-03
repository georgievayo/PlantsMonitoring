using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data.Devices
{
    public class DevicesManager : IDevicesManager
    {
        private const string DEVICES_COLLECTION_NAME = "Devices";
        private const string TELEMETRY_COLLECTION_NAME = "Telemetry";
        private const string DATABASE_ID = "PlantsMonitoring";

        private readonly DocumentClient client;
        private readonly Uri devicesUri;
        private readonly Uri telemetryUri;

        public DevicesManager(DocumentClient client)
        {
            this.client = client;
            devicesUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, DEVICES_COLLECTION_NAME);
            telemetryUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, TELEMETRY_COLLECTION_NAME);
        }

        public async Task<Document> Add(Device device)
        {
            return await this.client.CreateDocumentAsync(devicesUri, device);
        }

        public List<Device> GetAll()
        {
            return this.client.CreateDocumentQuery<Device>(devicesUri)
                .ToList();
        }

        public DeviceExtended GetExtendedDeviceById(string deviceId)
        {
            return this.client.CreateDocumentQuery<DeviceExtended>(devicesUri)
                .Where(entry => entry.Id == deviceId)
                .ToList()
                .FirstOrDefault();
        }

        public Device GetDeviceById(string deviceId)
        {
            return this.client.CreateDocumentQuery<Device>(devicesUri)
                .Where(entry => entry.Id == deviceId)
                .ToList()
                .FirstOrDefault();
        }

        public List<Measurement> GetDeviceTelemetry(string deviceId)
        {
            var minDate = DateTime.Now.Subtract(new TimeSpan(500,0, 0, 0, 0));

            return this.client.CreateDocumentQuery<Measurement>(telemetryUri)
                .Where(m => m.ReceivedAt >= minDate && m.DeviceId == deviceId)
                .ToList();
        }

        public Measurement GetLastMessage(string deviceId)
        {
            return this.client.CreateDocumentQuery<Measurement>(telemetryUri)
                .Where(entry => entry.DeviceId == deviceId)
                .OrderByDescending(entry => entry.ReceivedAt)
                .ToList()
                .FirstOrDefault();
        }

        public List<Measurement> GetLastMessages(string deviceId)
        {
            return this.client.CreateDocumentQuery<Measurement>(telemetryUri)
                .Where(entry => entry.DeviceId == deviceId)
                .OrderByDescending(entry => entry.ReceivedAt)
                .ToList();
        }

        public List<Measurement> GetTelemetry()
        {
            var minDate = DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0));

            return this.client.CreateDocumentQuery<Measurement>(telemetryUri)
                .Where(m => m.ReceivedAt >= minDate)
                .ToList();
        }

        public async Task UpdateStatus(Device device)
        {
            var uri = UriFactory.CreateDocumentUri(DATABASE_ID, DEVICES_COLLECTION_NAME, device.Id);
            await this.client.ReplaceDocumentAsync(uri, device);
        }
    }
}
