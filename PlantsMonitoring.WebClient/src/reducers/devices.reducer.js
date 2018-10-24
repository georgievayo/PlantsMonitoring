export default function devices(state = { devices: [] }, action) {
    switch (action.type) {
        case 'GET_DEVICES_SUCCESS':
            return {
                ...state,
                devices: action.devices
            };
        case 'POST_DEVICE_SUCCESS':
            return {
                ...state,
                devices: [...state.devices, action.device]
            };
        default:
            return state;
    }
}