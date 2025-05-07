import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const optimizeImage = async (imageUri) => {
  try {
    // Get image info
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    
    // If image size is greater than 1MB, resize and compress
    if (fileInfo.size > 1024 * 1024) {
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    }
    
    return imageUri;
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