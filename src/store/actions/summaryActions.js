// src/store/actions/summaryActions.js
import { processMedicalReport } from '../../api/medicalApi';

export const generateSummary = (imageUri) => async (dispatch) => {
  try {
    dispatch({ type: 'SUMMARY_REQUEST' });
    
    const summaryResponse = await processMedicalReport(imageUri);
    
    dispatch({
      type: 'SUMMARY_SUCCESS',
      payload: summaryResponse,
    });
    
    return summaryResponse;
  } catch (error) {
    dispatch({
      type: 'SUMMARY_FAILURE',
      payload: error.message || 'Failed to generate summary',
    });
    return null;
  }
};

export const clearSummary = () => ({
  type: 'SUMMARY_CLEAR',
});