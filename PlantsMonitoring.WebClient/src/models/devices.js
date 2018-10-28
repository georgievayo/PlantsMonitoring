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