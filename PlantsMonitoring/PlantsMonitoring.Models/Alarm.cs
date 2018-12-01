namespace PlantsMonitoring.Models
{
    public class Alarm
    {
        public string Id { get; set; }

        public string DeviceId { get; set; }

        public string RuleId { get; set; }

        public RuleType Type { get; set; }
    }
}
