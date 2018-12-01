const { operators, fields } = require('./constants');

module.exports = {
    isBreakingRule: (measurement, rule) => {
        if (rule.Field === fields.Temperature) {
            return breakRule(parseFloat(measurement.Temperature), rule.Operator, parseFloat(rule.Value));
        } else if (rule.Field === fields.Humidity) {
            return breakRule(parseFloat(measurement.Humidity), rule.Operator, parseFloat(rule.Value));
        } else if (rule.Field === fields.Light) {
            return breakRule(measurement.Light, rule.Operator, rule.Value);
        }

        return false;
    },
    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
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