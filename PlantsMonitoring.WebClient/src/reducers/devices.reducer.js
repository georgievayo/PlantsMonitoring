export default function devices(state = {entities: [], selectedDevice: {}}, action) {
    switch (action.type) {
        case 'GET_DEVICES_SUCCESS':
            return {
                ...state,
                entities: action.devices
            };
        case 'POST_DEVICE_SUCCESS':
            return {
                ...state,
                entities: [...state.entities, action.device]
            };
        case 'GET_DEVICE_SUCCESS': 
            return {
                ...state,
                selectedDevice: action.device
            }
        default:
            return state;
    }
}