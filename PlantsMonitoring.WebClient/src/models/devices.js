import { getResult } from '../utilities/methods';
import {toTelemetryModel} from './telemetry';
import {toRulesModel} from './rules';

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
    return {
        id: device.id,
        name: device.Name,
        status: device.Status === 1 ? 'Offline' : 'Online',
        group: device.Group.Name,
        telemetry: toTelemetryModel(device.Telemetry),
        rules: toRulesModel(device.Rules)
        // alarms
    };
}