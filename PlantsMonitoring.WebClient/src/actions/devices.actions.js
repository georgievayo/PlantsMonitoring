import { HttpClient, api } from '../httpClient';
import { toDevicesModel, toDeviceModel, toDeviceExtendedModel } from '../models/devices';

export function getAllDevices() {
    return function (dispatch) {
        return HttpClient.get(`${api.DEVICES}`)
            .then(toDevicesModel)
            .then(devices => dispatch(getAllDevicesSuccess(devices)));
    };
}

export function postDevice(device) {
    return function (dispatch) {
        return HttpClient.post(api.DEVICES, device)
            .then(toDeviceModel)
            .then(createdDevice => dispatch(postDeviceSuccess(createdDevice)));
    }
}

export function getDeviceDetails(deviceId) {
    return function (dispatch) {
        return HttpClient.get(`${api.DEVICES}/${deviceId}`)
        .then(toDeviceExtendedModel)
        .then(device => dispatch(getDeviceDetailsSuccess(device)));
    }
}

export function addMeasurementToDevice(measurement) {
    return {
        type: 'ADD_MEASUREMENT_TO_DEVICE',
        measurement
    };
}

export function addAlarmToDevice(alarm) {
    return {
        type: 'ADD_ALARM_TO_DEVICE',
        alarm
    };
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

function getDeviceDetailsSuccess(device) {
    return {
        type: 'GET_DEVICE_SUCCESS',
        device
    };
}