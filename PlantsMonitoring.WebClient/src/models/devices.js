import { getResult } from '../utilities/methods';

export const toDevicesModel = (response) => getResult(response)
    .map(toDeviceModel);

export const toDeviceModel = (response = {}) => {
    return {
        id: response.id,
        name: response.Name,
        status: response.Status === 1 ? 'Offline' : 'Online',
        group: response.Group.Name
    };
} 

export const toDeviceExtendedModel = (response) => {
    const device = response.Result;
    const temperatureData = device.Telemetry.map(t => {
        return {
            x: t.ReceivedAt,
            y: t.Temperature
        }
    });
    const humidityData = device.Telemetry.map(t => {
        return {
            x: t.ReceivedAt,
            y: t.Humidity
        }
    });
    const lightData = device.Telemetry.map(t => {
        return {
            x: t.ReceivedAt,
            y: t.Light
        }
    });
    const informationRulesCount = device.Rules.filter(r => r.Type === 1).length;
    const warningRulesCount = device.Rules.filter(r => r.Type === 2).length;
    const criticalRulesCount = device.Rules.filter(r => r.Type === 0).length;

    const informationAlarmsCount = device.Alarms.filter(r => r.Type === 1).length;
    const warningAlarmsCount = device.Alarms.filter(r => r.Type === 2).length;
    const criticalAlarmsCount = device.Alarms.filter(r => r.Type === 0).length;

    return {
        id: device.id,
        name: device.Name,
        status: device.Status === 1 ? 'Offline' : 'Online',
        group: device.Group.Name,
        temperatureData: temperatureData,
        humidityData: humidityData,
        lightData: lightData,
        informationRulesCount: informationRulesCount,
        warningRulesCount: warningRulesCount,
        criticalRulesCount: criticalRulesCount,
        alarms: device.Alarms,
        alarmsData: [criticalAlarmsCount, informationAlarmsCount, warningAlarmsCount]
    };
}