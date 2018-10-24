import { combineReducers } from 'redux';
import devices from './devices.reducer';
import groups from './groups.reducer';

const reducer = combineReducers({
    devices,
    groups
});

export default reducer;