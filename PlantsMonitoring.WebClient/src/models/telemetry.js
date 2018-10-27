export const toTelemetryModel = (response) => response
    .map(toMeasurementModel);

export const toMeasurementModel = (response = {}) => {
    return {
        id: response.id,
        deviceId: response.DeviceId,
        temperature: response.Temperature,
        humidity: response.Humidity,
        light: response.Light,
        receivedAt: response.ReceivedAt
    };
} 