// src/store/actions/imageActions.js
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const captureImage = () => async (dispatch) => {
  try {
    dispatch({ type: 'IMAGE_CAPTURE_START' });
    
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      dispatch({
        type: 'IMAGE_CAPTURE_FAILURE',
        payload: 'Camera permission denied',
      });
      return null;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      dispatch({ type: 'IMAGE_CAPTURE_FAILURE', payload: 'Image capture canceled' });
      return null;
    }
    
    // Optimize the image for upload
    const optimizedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 1200, height: 1600 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    
    dispatch({
      type: 'IMAGE_CAPTURE_SUCCESS',
      payload: optimizedImage,
    });
    
    return optimizedImage;
  } catch (error) {
    dispatch({
      type: 'IMAGE_CAPTURE_FAILURE',
      payload: error.message || 'Failed to capture image',
    });
    return null;
  }
};

export const pickImageFromGallery = () => async (dispatch) => {
  try {
    dispatch({ type: 'IMAGE_CAPTURE_START' });
    
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      dispatch({
        type: 'IMAGE_CAPTURE_FAILURE',
        payload: 'Gallery permission denied',
      });
      return null;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      dispatch({ type: 'IMAGE_CAPTURE_FAILURE', payload: 'Image selection canceled' });
      return null;
    }
    
    // Optimize the image for upload
    const optimizedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 1200, height: 1600 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    
    dispatch({
      type: 'IMAGE_CAPTURE_SUCCESS',
      payload: optimizedImage,
    });
    
    return optimizedImage;
  } catch (error) {
    dispatch({
      type: 'IMAGE_CAPTURE_FAILURE',
      payload: error.message || 'Failed to select image',
    });
    return null;
  }
};

export const clearImage = () => ({
  type: 'IMAGE_CLEAR',
});