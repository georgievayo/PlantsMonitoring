using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Alarms
{
    public class AlarmsManager : IAlarmsManager
    {
        private readonly DocumentClient client;
        private readonly Uri alarmsUri;
        private readonly FeedOptions options;

        public AlarmsManager(DocumentClient client)
        {
            this.client = client;
            this.alarmsUri = UriFactory.CreateDocumentCollectionUri(Constants.DATABASE_ID, Constants.ALARMS_COLLECTION_NAME);
            this.options = new FeedOptions { EnableCrossPartitionQuery = true };
        }

        public async Task Delete(Alarm alarm)
        {
            alarm.IsDeleted = true;
            await this.client.ReplaceDocumentAsync(alarmsUri, alarm);
        }

        public List<Alarm> GetAll(IEnumerable<string> devicesIds)
        {
            return this.client.CreateDocumentQuery<Alarm>(alarmsUri, options)
                .Where(a => devicesIds.Contains(a.DeviceId) && a.IsDeleted == false)
                .ToList();
        }

        public List<Alarm> GetAll()
        {
            return this.client.CreateDocumentQuery<Alarm>(alarmsUri, options)
                .Where(a => a.IsDeleted == false)
                .ToList();
        }

        public List<Alarm> GetAllByDevice(string deviceId)
        {
            return this.client.CreateDocumentQuery<Alarm>(alarmsUri, options)
                .Where(a => a.DeviceId == deviceId && a.IsDeleted == false)
                .ToList();
        }
    }
}
