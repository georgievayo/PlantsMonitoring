module.exports = (collection) => {
    return {
        addAlarm: async (alarm) => {
            const { body: doc } = await collection.items.create(alarm);
            return doc;
        },
        getAlarmsOfDevice: async (deviceId) => {
            const querySpec = {
                query: "SELECT * FROM Alarms a WHERE a.DeviceId = @deviceId",
                parameters: [
                    {
                        name: "@deviceId",
                        value: deviceId
                    },
                    {
                        name: "@isDeleted",
                        value: false
                    }
                ]
            };

            const { result: docs } = await collection.items.query(querySpec, {enableCrossPartitionQuery: true}).toArray();
            return docs;
        }
    }
}