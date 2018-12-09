const { operators, fields } = require('./constants');

module.exports = {
    createAlarms: (rules, deviceId) => {
        let alarms = [];
        const temperatureRules = rules.filter(x => x.field === fields.Temperature);
        const temperatureAlarm = createAlarm(temperatureRules, deviceId);
        if (temperatureAlarm) {
            alarms.push(temperatureAlarm);
        }

        const humidityRules = rules.filter(x => x.field === fields.Humidity);
        const humidityAlarm = createAlarm(humidityRules, deviceId);
        if (humidityAlarm) {
            alarms.push(humidityAlarm);
        }

        const lightRules = rules.filter(x => x.field === fields.Light);
        const lightAlarm = createAlarm(lightRules, deviceId);
        if (lightAlarm) {
            alarms.push(lightAlarm);
        }

        return alarms;
    },
    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    },
    getBreakingRules: (measurement, rules) => {
        let breakingRules = rules.filter(rule => isBreakingRule(measurement, rule))
            .map(rule => {
                return { id: rule.id, type: rule.Type, field: rule.Field };
            });

        return breakingRules;
    }
}

function breakRule(value, operator, criticalValue) {
    switch (operator) {
        case operators.Greater:
            return value > criticalValue;
        case operators.GreaterOrEqual:
            return value >= criticalValue;
        case operators.Equal:
            return value === criticalValue;
        case operators.LessOrEqual:
            return value <= criticalValue;
        case operators.Less:
            return value < criticalValue;
    }
}

function createAlarm(rules, deviceId) {
    const rule = getMostPowerfulRule(rules);
    console.log(rule);
    if (rule) {
        const alarm = {
            DeviceId: deviceId,
            RuleId: rule.id,
            Type: rule.type,
            RaisedAt: new Date(),
            IsDeleted: false
        };

        return alarm;
    }

    return null;
}

function getMostPowerfulRule(rules) {
    const criticalIndex = rules.findIndex(r => r.type === 0);
    const warningIndex = rules.findIndex(r => r.type === 2);
    const informationIndex = rules.findIndex(r => r.type === 1);
    if (criticalIndex >= 0) {
        return rules[criticalIndex];
    } else if (warningIndex >= 0) {
        return rules[warningIndex];
    } else if (informationIndex >= 0) {
        return rules[informationIndex];
    }

    return null;
}

function isBreakingRule(measurement, rule) {
    if (rule.Field === fields.Temperature) {
        return breakRule(parseFloat(measurement.Temperature), rule.Operator, parseFloat(rule.Value));
    } else if (rule.Field === fields.Humidity) {
        return breakRule(parseFloat(measurement.Humidity), rule.Operator, parseFloat(rule.Value));
    } else if (rule.Field === fields.Light) {
        return breakRule(measurement.Light, rule.Operator, rule.Value);
    }

    return false;
}