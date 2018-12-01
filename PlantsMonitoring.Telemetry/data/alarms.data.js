module.exports = (collection) => {
    return {
        async addAlarm(alarm) {
            const { body: doc } = await collection.items.create(alarm);
            return doc;
        }
    }
}