import { combineReducers } from 'redux';
import authReducer from './authReducer';
import imageReducer from './imageReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  image: imageReducer,
  summary: summaryReducer,
});

export default rootReducer;