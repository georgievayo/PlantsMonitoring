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
    return {
        id: response.id,
        name: response.Name,
        status: response.Status === 1 ? 'Offline' : 'Online',
        group: response.Group.Name,
        telemetry: toTelemetryModel(response.Telemetry),
        rules: toRulesModel(response.Rules)
        // alarms
    };
}