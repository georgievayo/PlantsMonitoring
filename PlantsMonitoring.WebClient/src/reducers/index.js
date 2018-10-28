import { combineReducers } from 'redux';
import devices from './devices.reducer';
import groups from './groups.reducer';
import telemetry from './telemetry.reducer';
import rules from './rules.reducer';

const reducer = combineReducers({
    devices,
    groups,
    telemetry,
    rules
});

export default reducer;