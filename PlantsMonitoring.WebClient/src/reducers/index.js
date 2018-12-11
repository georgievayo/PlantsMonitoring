import { combineReducers } from 'redux';
import devices from './devices.reducer';
import groups from './groups.reducer';
import telemetry from './telemetry.reducer';
import rules from './rules.reducer';
import alarms from './alarms.reducer';
import auth from './auth.reducer';
import loading from './loading.reducer';
import errorMessage from './error.reducer';

const reducer = combineReducers({
    devices,
    groups,
    telemetry,
    rules,
    alarms,
    auth,
    loading,
    errorMessage
});

export default reducer;