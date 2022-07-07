import { combineReducers } from 'redux';
import { statsReducer } from './stats/reducer';

export const rootReducer = combineReducers({
  stats: statsReducer,
});

