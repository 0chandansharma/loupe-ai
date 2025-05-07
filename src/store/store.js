// src/store/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import imageReducer from './reducers/imageReducer';
import summaryReducer from './reducers/summaryReducer';
import historyReducer from './reducers/historyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  image: imageReducer,
  summary: summaryReducer,
  history: historyReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;