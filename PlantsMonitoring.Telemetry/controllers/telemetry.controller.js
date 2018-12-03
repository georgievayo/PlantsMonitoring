const { isBreakingRule, asyncForEach } = require('../shared/methods');

module.exports = ({ telemetryData, devicesData, alarmsData, rulesData }, io) => {
    return {
        post: async (req, res) => {
            const measurement = req.body;
            measurement.ReceivedAt = new Date();
            const createdDocument = await telemetryData.addMeasurement(measurement);
            io.emit('SendMeasurement', createdDocument);
            const groupId = await devicesData.getGroupOfDevice(measurement.DeviceId);
            const rules = await rulesData.getRulesOfGroup(groupId);
            await asyncForEach(rules, async (rule) => {
                if (isBreakingRule(measurement, rule)) {
                    const alarm = {
                        DeviceId: measurement.DeviceId,
                        RuleId: rule.id,
                        Type: rule.Type,
                        RaisedAt: new Date(),
                        IsDeleted: false
                    };
                    const createdAlarm = await alarmsData.addAlarm(alarm);
                    io.emit('SendAlarm', createdAlarm);
                }
            });

            res.status(200)
                .json(createdDocument);
        }
    }
}