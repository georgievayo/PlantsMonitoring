using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.Common;
using PlantsMonitoring.Models;

namespace PlantsMonitoring.Data.Rules
{
    public class RulesManager : IRulesManager
    {
        private readonly DocumentClient client;
        private readonly Uri rulesUri;

        public RulesManager(DocumentClient client)
        {
            this.client = client;
            this.rulesUri = UriFactory.CreateDocumentCollectionUri(Constants.DATABASE_ID, Constants.RULES_COLLECTION_NAME);
        }

        public async Task<Document> Add(Rule rule)
        {
            return await this.client.CreateDocumentAsync(rulesUri, rule);
        }

        public List<Rule> GetAll(IEnumerable<string> groupIds)
        {
            return this.client.CreateDocumentQuery<Rule>(rulesUri)
                .Where(r => groupIds.Contains(r.GroupId))
                .ToList();
        }

        public Rule GetById(string id)
        {
            return this.client.CreateDocumentQuery<Rule>(rulesUri)
                .Where(r => r.Id == id)
                .ToList()
                .FirstOrDefault();
        }

        public List<Rule> GetGroupRules(string groupId)
        {
            return this.client.CreateDocumentQuery<Rule>(rulesUri)
                .Where(m => m.GroupId == groupId)
                .ToList();
        }
    }
}
