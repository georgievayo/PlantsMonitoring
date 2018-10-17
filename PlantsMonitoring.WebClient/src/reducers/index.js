import { combineReducers } from 'redux';
import devices from './devices.reducer';

const reducer = combineReducers({
    devices
});

export default reducer;