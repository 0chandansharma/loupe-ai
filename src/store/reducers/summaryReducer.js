const initialState = {
    summaries: {
      english: '',
      hindi: '',
    },
    loading: false,
    error: null,
  };
  
  const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUMMARY_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'SUMMARY_SUCCESS':
        return {
          ...state,
          summaries: {
            english: action.payload.English_Summary,
            hindi: action.payload.Hindi_Summary,
          },
          loading: false,
          error: null,
        };
      case 'SUMMARY_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'SUMMARY_CLEAR':
        return {
          ...state,
          summaries: {
            english: '',
            hindi: '',
          },
        };
      default:
        return state;
    }
  };
  
  export default summaryReducer;