using Microsoft.Azure.Documents;
using PlantsMonitoring.Models;
using System.Linq;
using System.Threading.Tasks;

namespace PlantsMonitoring.Data
{
    public interface IDbContext
    {
        Task<Document> AddEntry(object entry, string collectionName);

        IQueryable<Measurement> GetLastDocuments(string id, string collectionName);

        IQueryable<Rule> GetAllRules();

        IQueryable<Device> GetAllDevices();
    }
}
