import { combineReducers } from 'redux';
import devices from './devices.reducer';
import groups from './groups.reducer';
import telemetry from './telemetry.reducer';

const reducer = combineReducers({
    devices,
    groups,
    telemetry
});

export default reducer;