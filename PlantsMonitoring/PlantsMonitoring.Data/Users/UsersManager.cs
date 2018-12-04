using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;

namespace PlantsMonitoring.Data.Users
{
    public class UsersManager : IUsersManager
    {
        private const string USERS_COLLECTION_NAME = "Users";
        private const string DATABASE_ID = "PlantsMonitoring";

        private readonly DocumentClient client;
        private readonly Uri usersUri;

        public UsersManager(DocumentClient client)
        {
            this.client = client;
            usersUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, USERS_COLLECTION_NAME);
        }

        public async Task<Document> Add(Models.User user)
        {
            return await this.client.CreateDocumentAsync(usersUri, user);
        }

        public Models.User GetUser(string username, string password)
        {
            var option = new FeedOptions { EnableCrossPartitionQuery = true };
            return this.client.CreateDocumentQuery<Models.User>(usersUri, option)
                .Where(u => u.Username == username && u.Password == password)
                .ToList()
                .FirstOrDefault();
        }
    }
}
