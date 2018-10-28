using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlantsMonitoring.Models
{
    public class Rule
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string GroupId { get; set; }

        public string Field { get; set; }

        public string Operator { get; set; }

        public double Value { get; set; }

        public RuleType Type { get; set; }
    }
}
