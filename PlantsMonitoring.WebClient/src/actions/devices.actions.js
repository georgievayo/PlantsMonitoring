import { HttpClient, api } from '../httpClient';
import { toDevicesModel, toDeviceModel, toDeviceExtendedModel } from '../models/devices';

export function getAllDevices() {
    return function (dispatch) {
        dispatch({ type: 'GET_DEVICES_REQUEST' });
        return HttpClient.get(`${api.DEVICES}`, true)
            .then(toDevicesModel)
            .then(devices => dispatch(getAllDevicesSuccess(devices)))
            .catch(error => dispatch(getAllDevicesFailed()));
    };
}

export function postDevice(device) {
    return function (dispatch) {
        return HttpClient.post(api.DEVICES, device, true)
            .then(toDeviceModel)
            .then(createdDevice => dispatch(postDeviceSuccess(createdDevice)));
    }
}

export function getDeviceDetails(deviceId) {
    return function (dispatch) {
        dispatch({ type: 'GET_DEVICE_REQUEST' });
        return HttpClient.get(`${api.DEVICES}/${deviceId}`, true)
        .then(toDeviceExtendedModel)
        .then(device => dispatch(getDeviceDetailsSuccess(device)))
        .catch(error => dispatch(getDeviceDetailsFailed()));
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

function getAllDevicesFailed() {
    return {
        type: 'GET_DEVICES_FAILED',
        errorMessage: 'Could not get your devices.' 
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

function getDeviceDetailsFailed() {
    return {
        type: 'GET_DEVICE_FAILED',
        errorMessage: 'Could not get information about device.' 
    };
}