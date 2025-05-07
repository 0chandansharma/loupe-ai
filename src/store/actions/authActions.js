import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    // Simulate API call for demonstration purposes
    // In production, replace with actual API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: '1234',
            name: 'Dr. Jane Smith',
            email: credentials.email,
            token: 'sample-jwt-token',
          },
        });
      }, 1000);
    });

    if (response.success) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      await AsyncStorage.setItem('token', response.data.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
      
      return true;
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message || 'Authentication failed',
    });
    return false;
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  } catch (error) {
    console.error('Logout error:', error);
  }
};