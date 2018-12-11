namespace PlantsMonitoring.Common
{
    public class Constants
    {
        // Services
        public const string BASE_URI = "fabric:/PlantsMonitoring";
        public static string ALARMS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.AlarmsService";
        public static string DEVICES_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.DevicesService";
        public static string GROUPS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.GroupsService";
        public static string RULES_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.RulesService";
        public static string USERS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.UsersService";

        // Authentication
        public const string SECRET = "426c54ef-513e-47d8-8652-37bdd32c1fb6";
        public const string AUDIENCE = "plants-monitoring";
        public const string ISSUER = "http://localhost:3434";
        public const int TOKEN_EXPIRATION_DURATION = 3;
        public const string USER_ID_CLAIM = "UserId";
        public const string AUTH_SCHEME = "Bearer";

        // Database
        public const string DATABASE_ID = "PlantsMonitoring";
        public const string ALARMS_COLLECTION_NAME = "Alarms";
        public const string DEVICES_COLLECTION_NAME = "Devices";
        public const string TELEMETRY_COLLECTION_NAME = "Telemetry";
        public const string GROUPS_COLLECTION_NAME = "Groups";
        public const string RULES_COLLECTION_NAME = "Rules";
        public const string USERS_COLLECTION_NAME = "Users";
    }
}
