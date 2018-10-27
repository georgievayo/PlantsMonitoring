export default function devices(state = [], action) {
    switch (action.type) {
        case 'GET_DEVICES_SUCCESS':
            return [
                ...action.devices
            ];
        case 'POST_DEVICE_SUCCESS':
            return [
                ...state,
                action.device
            ];
        default:
            return state;
    }
}