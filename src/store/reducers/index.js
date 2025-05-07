// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import imageReducer from './imageReducer';
import summaryReducer from './summaryReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  image: imageReducer,
  summary: summaryReducer,
  history: historyReducer,
});

export default rootReducer;