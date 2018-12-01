module.exports = (collection) => {
    return {
        getGroupOfDevice: async (deviceId) =>{
            const querySpec = {
                query: "SELECT VALUE d.GroupId FROM Devices d WHERE d.id = @deviceId",
                parameters: [
                    {
                        name: "@deviceId",
                        value: deviceId
                    }
                ]
            };

            const { result: ids} = await collection.items.query(querySpec).toArray();
            return ids[0];
        }
    }
}