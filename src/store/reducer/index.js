// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import pokeReducer from './pokeReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import entityReducer from './entityReducer';
import activityTypeReducer from './activityTypeReducer';
import activityReducer from './activityReducer';
import eventReducer from './eventReducer';
import locationReducer from './locationReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  pokemon: pokeReducer,
  auth: authReducer,
  user: userReducer,
  entity: entityReducer,
  activityType: activityTypeReducer,
  activity: activityReducer,
  event: eventReducer,
  location: locationReducer,
});
// Exports
export default rootReducer;
