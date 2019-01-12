const { getBreakingRules, createAlarms, asyncForEach } = require('../shared/methods');

module.exports = ({ telemetryData, devicesData, alarmsData, rulesData }, io) => {
    return {
        post: async (req, res) => {
            const measurement = req.body;
            const createdDocument = await telemetryData.addMeasurement(measurement);
            io.emit('SendMeasurement', createdDocument);
            const deviceId = measurement.DeviceId;
            const groupId = await devicesData.getGroupOfDevice(deviceId);
            const rules = await rulesData.getRulesOfGroup(groupId);
            const alarms = await alarmsData.getAlarmsOfDevice(deviceId);
            let breakingRules = getBreakingRules(measurement, rules, alarms);
            if (breakingRules.length > 0) {
                const alarms = createAlarms(breakingRules, measurement.DeviceId);
                await asyncForEach(alarms, async alarm => {
                    const createdAlarm = await alarmsData.addAlarm(alarm);
                    io.emit('SendAlarm', createdAlarm);
                });
            }

            res.status(200)
                .json(createdDocument);
        }
    }
}