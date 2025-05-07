import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { captureImage, pickImageFromGallery } from '../store/actions/imageActions';
import { checkPermissions } from '../utils/permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import CameraView from '../components/CameraView';
import GalleryPicker from '../components/GalleryPicker';
import LoadingOverlay from '../components/LoadingOverlay';

const CameraScreen = ({ navigation }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.image);
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    const requestPermissions = async () => {
      const permissions = await checkPermissions();
      setPermissionsGranted(permissions.camera && permissions.mediaLibrary);
    };
    
    requestPermissions();
  }, []);
  
  const handleCapture = async (imageUri) => {
    if (imageUri) {
      navigation.navigate('Result', { imageUri });
    }
  };
  
  const handlePickImage = async () => {
    const result = await dispatch(pickImageFromGallery());
    if (result) {
      navigation.navigate('Result', { imageUri: result.uri });
    }
  };
  
  const handleGalleryPress = () => {
    setShowGallery(true);
  };
  
  const handleGalleryPickerClose = () => {
    setShowGallery(false);
  };
  
  const handleGallerySelection = (imageUri) => {
    setShowGallery(false);
    navigation.navigate('Result', { imageUri });
  };
  
  if (showGallery) {
    return (
      <GalleryPicker
        onSelectImage={handleGallerySelection}
        onClose={handleGalleryPickerClose}
      />
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.appTitle}>Loupe</Text>
        
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={28} color={colors.surface} />
        </TouchableOpacity>
      </View>
      
      <CameraView
        onCapture={handleCapture}
        onClose={() => {}}
        onGalleryPress={handleGalleryPress}
      />
      
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.summaryButton]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Summary</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.observationButton]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Observation</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {loading && <LoadingOverlay message="Processing..." />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 10,
  },
  appTitle: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.bold,
    color: colors.surface,
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#000',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  summaryButton: {
    backgroundColor: colors.primary,
  },
  observationButton: {
    backgroundColor: colors.info,
  },
  buttonText: {
    color: colors.surface,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.medium,
  },
});

export default CameraScreen;