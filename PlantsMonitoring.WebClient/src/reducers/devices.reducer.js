export default function devices(state = { devices: [] }, action) {
    switch (action.type) {
        case 'GET_DEVICES_SUCCESS':
            return {
                ...state,
                devices: action.devices
            };
        default:
            return state;
    }
}