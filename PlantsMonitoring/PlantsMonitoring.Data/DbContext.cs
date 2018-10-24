using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data
{
    public class DbContext : IDbContext
    {
        private const string DATABASE_ID = "PlantsMonitoring";
        private const string RULES_COLLECTION_NAME = "Rules";
        private const string DEVICES_COLLECTION_NAME = "Devices";
        private const string GROUPS_COLLECTION_NAME = "Groups";

        private readonly DocumentClient client;

        public DbContext(DocumentClient client)
        {
            this.client = client;
        }

        public async Task<Document> AddEntry(object entry, string collectionName)
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, collectionName);

            return await this.client.CreateDocumentAsync(collectionUri, entry);
        }

        public IQueryable<Rule> GetAllRules()
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, RULES_COLLECTION_NAME);

            return this.client.CreateDocumentQuery<Rule>(collectionUri);
        }

        public IQueryable<Device> GetAllDevices()
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, DEVICES_COLLECTION_NAME);

            return this.client.CreateDocumentQuery<Device>(collectionUri);
        }

        public IQueryable<Measurement> GetLastDocuments(string id, string collectionName)
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, collectionName);

            return this.client.CreateDocumentQuery<Measurement>(collectionUri)
                .Where(entry => entry.DeviceId == id)
                .OrderByDescending(entry => entry.ReceivedAt);
        }

        public IQueryable<Group> GetAllGroups()
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, GROUPS_COLLECTION_NAME);

            return this.client.CreateDocumentQuery<Group>(collectionUri);
        }
    }
}
