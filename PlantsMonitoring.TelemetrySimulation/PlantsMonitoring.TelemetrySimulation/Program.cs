using Microsoft.Azure.Documents.Client;
using PlantsMonitoring.TelemetrySimulation.Models;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace PlantsMonitoring.TelemetrySimulation
{
    class Program
    {
        private const string DB_ENDPOINT_URL = "https://plants-monitoring.documents.azure.com:443/";
        private const string PRIMARY_KEY = "9yLXTENQq8n8OPNe8IapKVUlue0Al5M8Ygps2bk0GYgfaPHNDM9kF9onsTdEk9SIEXHIVcWGMlLoN05w1FvjBQ==";
        private const string TELEMETRY_ENDPINT_URL = "https://plants-monitoring-telemetry.herokuapp.com/";

        private static Random random = new Random();

        static void Main(string[] args)
        {
            var periodTimeSpan = TimeSpan.FromSeconds(10);

            while (true)
            {
                var devices = GetDevices();
                foreach (var deviceId in devices)
                {
                    var measurement = new Measurement()
                    {
                        DeviceId = deviceId,
                        Temperature = random.Next(10, 20) + random.NextDouble(),
                        Humidity = random.NextDouble(),
                        Light = random.NextDouble(),
                        ReceivedAt = DateTime.Now
                    };

                    SendData(measurement);
                }

                Thread.Sleep(periodTimeSpan);
            }
        }

        static List<string> GetDevices()
        {
            var devicesUri = UriFactory.CreateDocumentCollectionUri("PlantsMonitoring", "Devices");
            var client = new DocumentClient(new Uri(DB_ENDPOINT_URL), PRIMARY_KEY);
            var devices = client.CreateDocumentQuery(devicesUri)
                .Select(d => d.Id)
                .ToList();

            return devices;
        }

        static void SendData(Measurement measurement)
        {
            RestClient client = new RestClient(TELEMETRY_ENDPINT_URL);
            var request = new RestRequest("api/telemetry", Method.POST);
            request.AddJsonBody(measurement);
            var response = client.Execute(request);
            Console.WriteLine($"DeviceId: {measurement.DeviceId}, Temperature: {measurement.Temperature}, Humidity: {measurement.Humidity}, Light: {measurement.Light}");
        }
    }
}
