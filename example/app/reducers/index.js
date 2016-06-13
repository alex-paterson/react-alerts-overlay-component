import {combineReducers} from 'redux';
import {alertsReducer} from 'react-alerts-overlay-component';

export default combineReducers({
  alerts: alertsReducer
});
