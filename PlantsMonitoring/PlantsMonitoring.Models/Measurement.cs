using System;

namespace PlantsMonitoring.Models
{
    public class Measurement
    {
        public string DeviceId { get; set; }

        public double Temperature { get; set; }

        public double Humidity { get; set; }

        public double Light { get; set; }

        public DateTime? ReceivedAt { get; set; }
    }
}
