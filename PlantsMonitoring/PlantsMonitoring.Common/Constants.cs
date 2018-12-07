namespace PlantsMonitoring.Common
{
    public class Constants
    {
        public const string BASE_URI = "fabric:/PlantsMonitoring";
        public static string ALARMS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.AlarmsService";
        public static string DEVICES_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.DevicesService";
        public static string GROUPS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.GroupsService";
        public static string RULES_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.RulesService";
        public static string USERS_SERVICE_URI = $"{BASE_URI}/PlantsMonitoring.UsersService";

        public const string SECRET = "426c54ef-513e-47d8-8652-37bdd32c1fb6";
        public const string AUDIENCE = "plants-monitoring";
        public const string ISSUER = "http://localhost:3434";
        public const int TOKEN_EXPIRATION_DURATION = 3;

        public const string USER_ID_CLAIM = "UserId";
        public const string AUTH_SCHEME = "Bearer";
    }
}
