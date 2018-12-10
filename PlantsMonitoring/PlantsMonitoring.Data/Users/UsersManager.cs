using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Common;

namespace PlantsMonitoring.Data.Users
{
    public class UsersManager : IUsersManager
    {
        private readonly DocumentClient client;
        private readonly Uri usersUri;

        public UsersManager(DocumentClient client)
        {
            this.client = client;
            usersUri = UriFactory.CreateDocumentCollectionUri(Constants.DATABASE_ID, Constants.USERS_COLLECTION_NAME);
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
