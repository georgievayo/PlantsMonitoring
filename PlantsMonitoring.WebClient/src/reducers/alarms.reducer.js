export default function groups(state = {entities: [], summary: []}, action) {
    switch (action.type) {
        case 'GET_ALARMS_SUMMARY_SUCCESS':
            return {
                ...state,
                summary: action.alarms
            };
        default:
            return state;
    }
}