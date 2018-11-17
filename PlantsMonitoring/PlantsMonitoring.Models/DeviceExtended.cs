using Newtonsoft.Json;
using System.Collections.Generic;

namespace PlantsMonitoring.Models
{
    public class DeviceExtended
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        public string Name { get; set; }

        public string GroupId { get; set; }

        public Group Group { get; set; }

        public Measurement LastMeasurement { get; set; }

        public DeviceStatus Status { get; set; }

        public List<Measurement> Telemetry { get; set; }

        public List<Rule> Rules { get; set; }

        //Alarms
    }
}
