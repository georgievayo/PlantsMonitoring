import { getResult } from '../utilities/methods';

export const toAlarmsModel = (response) => getResult(response)
    .map(toAlarmModel);

export const toAlarmModel = (response = {}) => {
    return {
        id: response.id,
        type: response.Type === 0 ? 'Critical' : (response.Type === 1 ? 'Information' : 'Warning'),
        device: response.Device ? response.Device.Name : '',
        rule: response.Rule ? response.Rule.Name : '',
        raisedAt: response.RaisedAt.split('T')[0]
    };
} 