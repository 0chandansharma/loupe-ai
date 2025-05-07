// src/screens/ResultScreen.js - Enhanced with more functionality
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Share,
  Clipboard,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { generateSummary } from '../store/actions/summaryActions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Header from '../components/Header';
import SummaryTabs from '../components/SummaryTabs';
import ResultCard from '../components/ResultCard';
import ShareOptions from '../components/ShareOptions';
import LoadingOverlay from '../components/LoadingOverlay';
import { optimizeImageForOCR, saveProcessedImage } from '../utils/imageHelpers';

const ResultScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [activeTab, setActiveTab] = useState('english');
  const [optimizedImageUri, setOptimizedImageUri] = useState(null);
  const [savingToGallery, setSavingToGallery] = useState(false);
  
  const dispatch = useDispatch();
  const { summaries, loading, error } = useSelector((state) => state.summary);
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    const prepareAndProcessImage = async () => {
      try {
        // Optimize image for OCR
        const optimized = await optimizeImageForOCR(imageUri);
        setOptimizedImageUri(optimized);
        
        // Process the optimized image
        await dispatch(generateSummary(optimized));
      } catch (err) {
        Alert.alert('Error', 'Failed to process the image. Please try again.');
        console.error('Image processing error:', err);
      }
    };
    
    prepareAndProcessImage();
  }, [imageUri, dispatch]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleShare = async () => {
    try {
      const message = activeTab === 'english' ? summaries.english : summaries.hindi;
      await Share.share({
        message: message,
        title: 'Medical Report Summary',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share summary');
    }
  };
  
  const handleCopy = () => {
    try {
      const message = activeTab === 'english' ? summaries.english : summaries.hindi;
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Clipboard.setString(message);
        Alert.alert('Success', 'Summary copied to clipboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };
  
  const handleSaveImage = async () => {
    try {
      setSavingToGallery(true);
      
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot save image without gallery permission');
        setSavingToGallery(false);
        return;
      }
      
      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      await MediaLibrary.createAlbumAsync('Loupe Medical Reports', asset, false);
      
      // Create a PDF with the image and summary
      // This would require additional libraries like react-native-html-to-pdf
      // or react-native-pdf-lib which aren't currently in your dependencies
      
      setSavingToGallery(false);
      Alert.alert('Success', 'Image saved to gallery in "Loupe Medical Reports" album');
    } catch (error) {
      setSavingToGallery(false);
      Alert.alert('Error', 'Failed to save image');
      console.error('Save error:', error);
    }
  };
  
  const handleSaveText = async () => {
    try {
      // Create a filename with timestamp
      const timestamp = new Date().getTime();
      const filename = `medical_report_${timestamp}.txt`;
      const directory = `${FileSystem.documentDirectory}reports/`;
      
      // Ensure directory exists
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }
      
      // Get the text content
      const content = activeTab === 'english' ? 
        summaries.english : 
        summaries.hindi;
      
      // Write the file
      const fileUri = `${directory}${filename}`;
      await FileSystem.writeAsStringAsync(fileUri, content);
      
      // Share the file if on a supported platform
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Success', 'Summary saved successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save or share summary');
      console.error('Save/Share error:', error);
    }
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Report Analysis"
        onBackPress={() => navigation.goBack()}
        rightAction={{
          icon: 'refresh-outline',
          onPress: () => dispatch(generateSummary(optimizedImageUri || imageUri)),
        }}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => {
            // Future: Implement image zoom view
          }}
        >
          <Image 
            source={{ uri: optimizedImageUri || imageUri }} 
            style={styles.reportImage} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <SummaryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {!loading && !error && (
          <ResultCard
            summary={activeTab === 'english' ? summaries.english : summaries.hindi}
            language={activeTab}
          />
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color={colors.error} />
            <Text style={styles.errorText}>Failed to analyze report</Text>
            <Text style={styles.errorSubtext}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => dispatch(generateSummary(optimizedImageUri || imageUri))}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.actionsContainer}>
        <ShareOptions
          onShare={handleShare}
          onCopy={handleCopy}
          onSave={handleSaveText}
        />
        
        <TouchableOpacity 
          style={styles.saveImageButton}
          onPress={handleSaveImage}
        >
          <Ionicons name="save-outline" size={20} color={colors.surface} />
          <Text style={styles.saveImageText}>Save Image</Text>
        </TouchableOpacity>
      </View>
      
      {(loading || savingToGallery) && (
        <LoadingOverlay message={loading ? "Analyzing medical report..." : "Saving to gallery..."} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#000',
    width: '100%',
  },
  reportImage: {
    width: '100%',
    height: 250,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 16,
  },
  errorText: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.bold,
    color: colors.error,
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: fonts.sizes.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.surface,
    fontWeight: fonts.weights.semibold,
  },
  actionsContainer: {
    backgroundColor: colors.surface,
  },
  saveImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.info,
    paddingVertical: 12,
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
  },
  saveImageText: {
    color: colors.surface,
    marginLeft: 8,
    fontWeight: fonts.weights.medium,
  },
});

export default ResultScreen;