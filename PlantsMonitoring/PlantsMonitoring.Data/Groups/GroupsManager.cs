using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data.Groups
{
    public class GroupsManager : IGroupsManager
    {
        private const string GROUPS_COLLECTION_NAME = "Groups";
        private const string DATABASE_ID = "PlantsMonitoring";

        private readonly DocumentClient client;
        private readonly Uri groupsUri;

        public GroupsManager(DocumentClient client)
        {
            this.client = client;
            this.groupsUri = UriFactory.CreateDocumentCollectionUri(DATABASE_ID, GROUPS_COLLECTION_NAME);
        }

        public async Task<Document> Add(Group group)
        {
            return await this.client.CreateDocumentAsync(groupsUri, group);
        }

        public List<Group> GetAll(string userId)
        {
            return this.client.CreateDocumentQuery<Group>(groupsUri)
                .Where(g => g.UserId == userId)
                .ToList();
        }

        public Group GetGroupById(string groupId)
        {
            return this.client.CreateDocumentQuery<Group>(groupsUri)
                .Where(entry => entry.Id == groupId)
                .ToList()
                .FirstOrDefault();
        }
    }
}
