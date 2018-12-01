module.exports = (collection) => {
    return {
        addMeasurement: async (measurement) =>{
            const { body: doc } = await collection.items.create(measurement);
            return doc;
        }
    }
}