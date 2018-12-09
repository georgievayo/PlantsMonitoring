using Newtonsoft.Json;

namespace PlantsMonitoring.Models
{
    public class Group
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string UserId { get; set; }
    }
}
