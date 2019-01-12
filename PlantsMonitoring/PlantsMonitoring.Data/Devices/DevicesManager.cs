using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data.Devices
{
    public class DevicesManager : IDevicesManager
    {
        private readonly DocumentClient client;
        private readonly Uri devicesUri;
        private readonly Uri telemetryUri;
        private readonly FeedOptions options;

        public DevicesManager(DocumentClient client)
        {
            this.client = client;
            devicesUri = UriFactory.CreateDocumentCollectionUri(Constants.DATABASE_ID, Constants.DEVICES_COLLECTION_NAME);
            telemetryUri = UriFactory.CreateDocumentCollectionUri(Constants.DATABASE_ID, Constants.TELEMETRY_COLLECTION_NAME);
            this.options = new FeedOptions { EnableCrossPartitionQuery = true };
        }

        public async Task<Document> Add(Device device)
        {
            return await this.client.CreateDocumentAsync(devicesUri, device);
        }

        public List<Device> GetAll(string userId)
        {
            return this.client.CreateDocumentQuery<Device>(devicesUri)
                .Where(d => d.UserId == userId)
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
            var minDate = DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0, 0));

            return this.client.CreateDocumentQuery<Measurement>(telemetryUri, options)
                .Where(m => m.ReceivedAt >= minDate && m.DeviceId == deviceId)
                .ToList();
        }

        public Measurement GetLastMessage(string deviceId)
        {
            return this.client.CreateDocumentQuery<Measurement>(telemetryUri, options)
                .Where(entry => entry.DeviceId == deviceId)
                .OrderByDescending(entry => entry.ReceivedAt)
                .ToList()
                .FirstOrDefault();
        }

        public List<Measurement> GetLastMessages(string deviceId)
        {
            return this.client.CreateDocumentQuery<Measurement>(telemetryUri, options)
                .Where(entry => entry.DeviceId == deviceId)
                .OrderByDescending(entry => entry.ReceivedAt)
                .ToList();
        }

        public List<Measurement> GetTelemetry(IEnumerable<string> devicesIds)
        {
            var minDate = DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0));

            return this.client.CreateDocumentQuery<Measurement>(telemetryUri, options)
                .Where(m => m.ReceivedAt >= minDate && devicesIds.Contains(m.DeviceId))
                .ToList();
        }

        public async Task Update(Device device)
        {
            var uri = UriFactory.CreateDocumentUri(Constants.DATABASE_ID, Constants.DEVICES_COLLECTION_NAME, device.Id);
            await this.client.ReplaceDocumentAsync(uri, device);
        }

        public List<Device> GetAll()
        {
            return this.client.CreateDocumentQuery<Device>(devicesUri)
               .ToList();
        }
    }
}
