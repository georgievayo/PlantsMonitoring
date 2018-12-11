module.exports = (collection) => {
    return {
        getRulesOfGroup: async (groupId) =>{
            const querySpec = {
                query: "SELECT * FROM Rules d WHERE d.GroupId = @groupId",
                parameters: [
                    {
                        name: "@groupId",
                        value: groupId
                    }
                ]
            };

            const { result: docs } = await collection.items.query(querySpec).toArray();
            return docs;
        }
    }
}