using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;
using System;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data.Telemetry
{
    public class TelemetryManager : ITelemetryManager
    {
        private const string TELEMETRY_COLLECTION_NAME = "Telemetry";
        private const string DATABASE_ID = "PlantsMonitoring";

        private readonly DocumentClient client;
        private readonly Uri telemetryUri;

        public TelemetryManager(DocumentClient client)
        {
            this.client = client;
            telemetryUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, TELEMETRY_COLLECTION_NAME);
        }

        public async Task<Document> Add(Measurement measurement)
        {
            return await this.client.CreateDocumentAsync(telemetryUri, measurement);
        }
    }
}
