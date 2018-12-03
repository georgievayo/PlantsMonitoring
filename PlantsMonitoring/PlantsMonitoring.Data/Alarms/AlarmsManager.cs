using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Alarms
{
    public class AlarmsManager : IAlarmsManager
    {
        private const string ALARMS_COLLECTION_NAME = "Alarms";
        private const string DATABASE_ID = "PlantsMonitoring";

        private readonly DocumentClient client;
        private readonly Uri alarmsUri;

        public AlarmsManager(DocumentClient client)
        {
            this.client = client;
            this.alarmsUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, ALARMS_COLLECTION_NAME);
        }

        public async Task Delete(Alarm alarm)
        {
            var uri = UriFactory.CreateDocumentUri(DATABASE_ID, ALARMS_COLLECTION_NAME, alarm.Id);
            alarm.IsDeleted = true;
            await this.client.ReplaceDocumentAsync(uri, alarm);
        }

        public List<Alarm> GetAll()
        {
            var option = new FeedOptions { EnableCrossPartitionQuery = true };
            return this.client.CreateDocumentQuery<Alarm>(alarmsUri, option)
                .ToList();
        }

        public List<Alarm> GetAllByDevice(string deviceId)
        {
            var option = new FeedOptions { EnableCrossPartitionQuery = true };
            return this.client.CreateDocumentQuery<Alarm>(alarmsUri, option)
                .Where(a => a.DeviceId == deviceId && a.IsDeleted == false)
                .ToList();
        }
    }
}
