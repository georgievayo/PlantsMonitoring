module.exports = (collection) => {
    return {
        addMeasurement: async (measurement) => {
            measurement.ReceivedAt = new Date();
            const { body: doc } = await collection.items.create(measurement);
            return doc;
        }
    }
}