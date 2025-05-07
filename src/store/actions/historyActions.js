// src/store/actions/historyActions.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createThumbnail } from '../../utils/imageHelpers';

// Fetch scan history
export const fetchHistory = () => async (dispatch) => {
  try {
    dispatch({ type: 'HISTORY_FETCH_START' });
    
    // Get history from AsyncStorage
    const historyJson = await AsyncStorage.getItem('scan_history');
    const history = historyJson ? JSON.parse(historyJson) : [];
    
    dispatch({
      type: 'HISTORY_FETCH_SUCCESS',
      payload: history,
    });
    
    return history;
  } catch (error) {
    dispatch({
      type: 'HISTORY_FETCH_FAILURE',
      payload: error.message || 'Failed to fetch history',
    });
    return [];
  }
};

// Add scan to history
export const addToHistory = (scanData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'HISTORY_ADD_START' });
    
    // Create thumbnail
    let thumbnailUri = await createThumbnail(scanData.imageUri);
    
    // Get current history
    const historyJson = await AsyncStorage.getItem('scan_history');
    let history = historyJson ? JSON.parse(historyJson) : [];
    
    // Create history entry
    const historyEntry = {
      id: Date.now().toString(),
      imageUri: scanData.imageUri,
      thumbnailUri: thumbnailUri,
      summaryEnglish: scanData.summaryEnglish,
      summaryHindi: scanData.summaryHindi,
      timestamp: Date.now(),
    };
    
    // Add to history (newest first)
    history = [historyEntry, ...history];
    
    // Limit history to last 30 items to prevent storage issues
    if (history.length > 30) {
      history = history.slice(0, 30);
    }
    
    // Save updated history
    await AsyncStorage.setItem('scan_history', JSON.stringify(history));
    
    dispatch({
      type: 'HISTORY_ADD_SUCCESS',
      payload: history,
    });
    
    return historyEntry;
  } catch (error) {
    dispatch({
      type: 'HISTORY_ADD_FAILURE',
      payload: error.message || 'Failed to add to history',
    });
    return null;
  }
};

// Delete scan from history
export const deleteFromHistory = (scanId) => async (dispatch) => {
  try {
    dispatch({ type: 'HISTORY_DELETE_START' });
    
    // Get current history
    const historyJson = await AsyncStorage.getItem('scan_history');
    if (!historyJson) {
      dispatch({ type: 'HISTORY_DELETE_SUCCESS', payload: [] });
      return true;
    }
    
    let history = JSON.parse(historyJson);
    
    // Remove the item
    history = history.filter(item => item.id !== scanId);
    
    // Save updated history
    await AsyncStorage.setItem('scan_history', JSON.stringify(history));
    
    dispatch({
      type: 'HISTORY_DELETE_SUCCESS',
      payload: history,
    });
    
    return true;
  } catch (error) {
    dispatch({
      type: 'HISTORY_DELETE_FAILURE',
      payload: error.message || 'Failed to delete from history',
    });
    return false;
  }
};

// Clear all history
export const clearHistory = () => async (dispatch) => {
  try {
    dispatch({ type: 'HISTORY_CLEAR_START' });
    
    // Remove history from storage
    await AsyncStorage.removeItem('scan_history');
    
    dispatch({ type: 'HISTORY_CLEAR_SUCCESS' });
    
    return true;
  } catch (error) {
    dispatch({
      type: 'HISTORY_CLEAR_FAILURE',
      payload: error.message || 'Failed to clear history',
    });
    return false;
  }
};