import { HttpClient, api } from '../httpClient';
import { toDevicesModel, toDeviceModel } from '../models/devices';

export function getAllDevices() {
    return function (dispatch) {
        return HttpClient.get(`${api.DEVICES}`)
            .then(toDevicesModel)
            .then(devices => dispatch(getAllDevicesSuccess(devices)));
    };
}

export function postDevice(device) {
    return function (dispatch) {
        debugger;
        return HttpClient.post(api.DEVICES, device)
            .then(toDeviceModel)
            .then(createdDevice => dispatch(postDeviceSuccess(createdDevice)));
    }
}

function getAllDevicesSuccess(devices) {
    return {
        type: 'GET_DEVICES_SUCCESS',
        devices
    };
}

function postDeviceSuccess(device) {
    return {
        type: 'POST_DEVICE_SUCCESS',
        device
    };
}