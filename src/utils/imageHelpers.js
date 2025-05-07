// src/utils/imageHelpers.js - Enhanced for OCR-friendly images
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const optimizeImageForOCR = async (imageUri) => {
  try {
    // Get image info
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    
    // Always optimize for OCR regardless of size
    const manipResult = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        // Resize to reasonable dimensions for OCR
        { resize: { width: 1800 } },
        // Enhance contrast for better text recognition
        { contrast: 1.2 }
      ],
      { 
        compress: 0.9, // Higher quality for better OCR
        format: ImageManipulator.SaveFormat.JPEG 
      }
    );
    
    return manipResult.uri;
  } catch (error) {
    console.error('Image optimization error:', error);
    return imageUri; // Return original URI if optimization fails
  }
};

export const createThumbnail = async (imageUri) => {
  try {
    const thumbnail = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 300 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return thumbnail.uri;
  } catch (error) {
    console.error('Thumbnail creation error:', error);
    return null;
  }
};

// Add a function to save processed images
export const saveProcessedImage = async (imageUri, filename) => {
  try {
    const directory = `${FileSystem.documentDirectory}processed_images/`;
    
    // Ensure directory exists
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
    
    const newUri = `${directory}${filename}`;
    await FileSystem.copyAsync({
      from: imageUri,
      to: newUri
    });
    
    return newUri;
  } catch (error) {
    console.error('Error saving processed image:', error);
    return null;
  }
};