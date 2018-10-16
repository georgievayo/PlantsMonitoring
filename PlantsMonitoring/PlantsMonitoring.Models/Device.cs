namespace PlantsMonitoring.Models
{
    public class Device
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string GroupId { get; set; }

        public DeviceStatus Status { get; set; }
    }
}
