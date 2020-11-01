import {combineReducers} from 'redux';
import stations from './stationsReducer';
import view from './viewReducer';

export default combineReducers({
  stations,
  view,
});
