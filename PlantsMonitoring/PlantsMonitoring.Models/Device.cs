using Newtonsoft.Json;

namespace PlantsMonitoring.Models
{
    public class Device
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        public string Name { get; set; }

        public string GroupId { get; set; }

        public Group Group { get; set; }

        public Measurement LastMeasurement { get; set; }

        public DeviceStatus Status { get; set; }
    }
}
