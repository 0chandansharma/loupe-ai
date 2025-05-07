// src/store/reducers/historyReducer.js
const initialState = {
    items: [],
    loading: false,
    error: null,
  };
  
  const historyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'HISTORY_FETCH_START':
      case 'HISTORY_ADD_START':
      case 'HISTORY_DELETE_START':
      case 'HISTORY_CLEAR_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
        
      case 'HISTORY_FETCH_SUCCESS':
      case 'HISTORY_ADD_SUCCESS':
      case 'HISTORY_DELETE_SUCCESS':
        return {
          ...state,
          items: action.payload,
          loading: false,
          error: null,
        };
        
      case 'HISTORY_CLEAR_SUCCESS':
        return {
          ...state,
          items: [],
          loading: false,
          error: null,
        };
        
      case 'HISTORY_FETCH_FAILURE':
      case 'HISTORY_ADD_FAILURE':
      case 'HISTORY_DELETE_FAILURE':
      case 'HISTORY_CLEAR_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      default:
        return state;
    }
  };
  
  export default historyReducer;