import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export const requestCameraPermission = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }
    return true;
  }
  return true;
};

export const requestMediaLibraryPermission = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }
    return true;
  }
  return true;
};

export const checkPermissions = async () => {
  const cameraPermission = await requestCameraPermission();
  const mediaLibraryPermission = await requestMediaLibraryPermission();
  
  return {
    camera: cameraPermission,
    mediaLibrary: mediaLibraryPermission,
  };
};