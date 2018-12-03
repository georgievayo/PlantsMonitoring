import { HttpClient, api } from '../httpClient';

export function getAlarmsSummary() {
    return function (dispatch) {
        return HttpClient.get(`${api.ALARMS}/summary`)
            .then(alarms => dispatch(getAlarmsSummarySuccess(alarms.Result)));
    };
}

function getAlarmsSummarySuccess(alarms) {
    return {
        type: 'GET_ALARMS_SUMMARY_SUCCESS',
        alarms
    };
}