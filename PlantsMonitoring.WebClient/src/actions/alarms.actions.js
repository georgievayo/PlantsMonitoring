import { HttpClient, api } from '../httpClient';
import { toAlarmsModel } from '../models/alarms';

export function getAlarmsSummary() {
    return function (dispatch) {
        return HttpClient.get(`${api.ALARMS}/summary`, true)
            .then(alarms => dispatch(getAlarmsSummarySuccess(alarms.Result)))
            .catch(error => dispatch(getAlarmsSummaryFailed()));
    };
}

export function getAll() {
    return function (dispatch) {
        dispatch({ type: 'GET_ALARMS_REQUEST' });
        return HttpClient.get(`${api.ALARMS}`, true)
            .then(toAlarmsModel)
            .then(alarms => dispatch(getAllSuccess(alarms)))
            .catch(error => dispatch(getAllFailed()));
    };
}

function getAlarmsSummarySuccess(alarms) {
    return {
        type: 'GET_ALARMS_SUMMARY_SUCCESS',
        alarms
    };
}

function getAlarmsSummaryFailed() {
    return {
        type: 'GET_ALARMS_SUMMARY_FAILED',
        errorMessage: 'Could not get summary of alarms.' 
    };
}

function getAllSuccess(alarms) {
    return {
        type: 'GET_ALARMS_SUCCESS',
        alarms
    };
}

function getAllFailed() {
    return {
        type: 'GET_ALARMS_FAILED',
        errorMessage: 'Could not get your alarms.' 
    };
}