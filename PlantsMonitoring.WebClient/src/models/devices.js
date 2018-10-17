import { getResult } from '../utilities/methods';

export const toDevicesModel = (response) => getResult(response)
    .map(toDeviceModel);

export const toDeviceModel = (response = {}) => {
    debugger;
    return {
        id: response.Id,
        name: response.Name,
        status: response.Status === 1 ? 'Offline' : 'Online',
        group: response.GroupId
    };
} 