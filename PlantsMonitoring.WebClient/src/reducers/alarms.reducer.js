export default function alarms(state = {entities: [], summary: []}, action) {
    switch (action.type) {
        case 'GET_ALARMS_SUMMARY_SUCCESS':
            return {
                ...state,
                summary: action.alarms
            };
        case 'GET_ALARMS_SUCCESS': 
        debugger;
            return {
                ...state,
                entities: action.alarms
            }
        default:
            return state;
    }
}