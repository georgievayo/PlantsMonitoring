import { HttpClient, api } from '../httpClient';
import { toAlarmsModel } from '../models/alarms';

export function getAlarmsSummary() {
    return function (dispatch) {
        return HttpClient.get(`${api.ALARMS}/summary`, true)
            .then(alarms => dispatch(getAlarmsSummarySuccess(alarms.Result)));
    };
}

export function getAll() {
    return function (dispatch) {
        return HttpClient.get(`${api.ALARMS}`, true)
            .then(toAlarmsModel)
            .then(alarms => dispatch(getAllSuccess(alarms)));
    };
}

function getAlarmsSummarySuccess(alarms) {
    return {
        type: 'GET_ALARMS_SUMMARY_SUCCESS',
        alarms
    };
}

function getAllSuccess(alarms) {
    return {
        type: 'GET_ALARMS_SUCCESS',
        alarms
    };
}