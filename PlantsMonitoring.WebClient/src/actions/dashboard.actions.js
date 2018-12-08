import { HttpClient, api } from '../httpClient';
import { toTelemetryModel } from '../models/telemetry';

export function getTelemetry() {
    return function (dispatch) {
        return HttpClient.get(`${api.DEVICES}/telemetry`, true)
            .then(toTelemetryModel)
            .then(telemetry => dispatch(getTelemetrySuccess(telemetry)));
    };
}

export function addMeasurement(measurement) {
    return {
        type: 'ADD_MEASUREMENT',
        measurement
    };
}

function getTelemetrySuccess(telemetry) {
    return {
        type: 'GET_TELEMETRY_SUCCESS',
        telemetry
    };
}