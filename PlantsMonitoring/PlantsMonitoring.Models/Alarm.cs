using System;

namespace PlantsMonitoring.Models
{
    public class Alarm
    {
        public string Id { get; set; }

        public string DeviceId { get; set; }

        public Device Device { get; set; }

        public string RuleId { get; set; }

        public Rule Rule { get; set; }

        public RuleType Type { get; set; }

        public DateTime RaisedAt { get; set; }

        public bool IsDeleted { get; set; }
    }
}
