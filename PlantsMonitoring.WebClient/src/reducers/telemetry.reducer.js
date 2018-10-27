export default function telemetry(state = [], action) {
    switch (action.type) {
        case 'GET_TELEMETRY_SUCCESS':
            return [
                ...action.telemetry
            ];
        default:
            return state;
    }
}