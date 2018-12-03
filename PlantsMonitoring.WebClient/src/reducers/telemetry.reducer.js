export default function telemetry(state = [], action) {
    switch (action.type) {
        case 'GET_TELEMETRY_SUCCESS':
            return [
                ...action.telemetry
            ];
        case 'ADD_MEASUREMENT': 
            return [
                ...state,
                action.measurement
            ];
        default:
            return state;
    }
}