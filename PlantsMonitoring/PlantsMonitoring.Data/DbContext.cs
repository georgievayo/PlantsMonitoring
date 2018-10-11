using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data
{
    public class DbContext : IDbContext
    {
        private const string DATABASE_ID = "";
        private const string RULES_COLLECTION_NAME = "Rules";
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

        public IQueryable<Measurement> GetLastDocuments(string id, string collectionName)
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, collectionName);

            return this.client.CreateDocumentQuery<Measurement>(collectionUri)
                .Where(entry => entry.DeviceId == id)
                .OrderByDescending(entry => entry.ReceivedAt);
        }
    }
}
