export default function devices(state = { entities: [], selectedDevice: {} }, action) {
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
            };
        case 'ADD_MEASUREMENT_TO_DEVICE':
            return {
                ...state,
                selectedDevice: addMeasurementIfSelectedDevice(state.selectedDevice, action.measurement)
            };
        case 'ADD_ALARM_TO_DEVICE':
            return {
                ...state,
                selectedDevice: addAlarmIfSelectedDevice(state.selectedDevice, action.alarm)
            }
        default:
            return state;
    }
}

function addMeasurementIfSelectedDevice(device, measurement) {
    let updatedDevice = { ...device };
    if (measurement.DeviceId === device.id) {
        updatedDevice.temperatureData.push({
            x: measurement.ReceivedAt,
            y: measurement.Temperature
        });

        updatedDevice.humidityData.push({
            x: measurement.ReceivedAt,
            y: measurement.Humidity
        });

        updatedDevice.lightData.push({
            x: measurement.ReceivedAt,
            y: measurement.Light
        });

        return updatedDevice;
    }
}

function addAlarmIfSelectedDevice(device, alarm) {
    let updatedDevice = { ...device };
    if (alarm.DeviceId === device.id) {
        updatedDevice.alarmsData[alarm.Type]++;
    }

    return updatedDevice;
}