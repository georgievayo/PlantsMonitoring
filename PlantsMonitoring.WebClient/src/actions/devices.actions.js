import { HttpClient, api } from '../httpClient';
import { toDevicesModel } from '../models/devices';

export function getAllDevices() {
    return function (dispatch) {
        return HttpClient.get(`${api.DEVICES}`)
            .then(toDevicesModel)
            .then(devices => dispatch(getAllDevicesSuccess(devices)));
    };
}

function getAllDevicesSuccess(devices) {
    return {
        type: 'GET_DEVICES_SUCCESS',
        devices
    };
}