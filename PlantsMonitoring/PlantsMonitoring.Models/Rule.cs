namespace PlantsMonitoring.Models
{
    public class Rule
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string GroupId { get; set; }

        public Group Group { get; set; }

        public string Field { get; set; }

        public string Operator { get; set; }

        public double Value { get; set; }

        public RuleType Type { get; set; }
    }
}
