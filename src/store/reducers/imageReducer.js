const initialState = {
    image: null,
    loading: false,
    error: null,
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'IMAGE_CAPTURE_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'IMAGE_CAPTURE_SUCCESS':
        return {
          ...state,
          image: action.payload,
          loading: false,
          error: null,
        };
      case 'IMAGE_CAPTURE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'IMAGE_CLEAR':
        return {
          ...state,
          image: null,
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;