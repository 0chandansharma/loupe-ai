// app/index.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureImage, pickImageFromGallery } from '../src/store/actions/imageActions';
import { checkPermissions } from '../src/utils/permissions';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';
import CameraView from '../src/components/CameraView';
import LoadingOverlay from '../src/components/LoadingOverlay';

export default function HomeScreen() {
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
      router.push({
        pathname: '/result',
        params: { imageUri }
      });
    }
  };
  
  const handlePickImage = async () => {
    const result = await dispatch(pickImageFromGallery());
    if (result) {
      router.push({
        pathname: '/result',
        params: { imageUri: result.uri }
      });
    }
  };
  
  const handleGalleryPress = () => {
    setShowGallery(true);
    handlePickImage();
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.appTitle}>Loupe</Text>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/history')}
          >
            <Ionicons name="time-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle" size={28} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>
      
      <CameraView
        onCapture={handleCapture}
        onClose={() => {}}
        onGalleryPress={handleGalleryPress}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Align document within the frame for best results
        </Text>
      </View>
      
      {loading && <LoadingOverlay message="Processing..." />}
    </View>
  );
}

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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerText: {
    color: colors.surface,
    fontSize: fonts.sizes.small,
    textAlign: 'center',
  },
});