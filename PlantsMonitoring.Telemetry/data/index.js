module.exports = (cosmosDbClient) => {
    return {
        initDbCollections: async () => {
            const database = await cosmosDbClient.database('PlantsMonitoring');
            const telemetryCollection = await database.container('Telemetry');
            const alarmsCollection = await database.container('Alarms');
            const devicesCollection = await database.container('Devices');
            const rulesCollection = await database.container('Rules');
            
            return {
                telemetryCollection,
                alarmsCollection,
                devicesCollection,
                rulesCollection
            };
        }
    }
}