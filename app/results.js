// app/result.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Share, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

// Dummy API function to simulate processing a medical report
const processMedicalReport = (imageUri) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        English_Summary: "The chest X-ray reveals clear lung fields bilaterally with no evidence of consolidation, infiltrates, or pleural effusion. Heart size appears normal with cardiothoracic ratio within normal limits. No mediastinal widening observed. Bony structures show no acute abnormalities. Diaphragm and costophrenic angles are intact. Overall impression is a normal chest X-ray with no radiographic evidence of acute cardiopulmonary disease.",
        Hindi_Summary: "छाती के एक्स-रे में दोनों ओर फेफड़े के क्षेत्र साफ दिखाई देते हैं, जिनमें कोई संघनन, इन्फिल्ट्रेट, या प्लूरल एफ्यूजन नहीं है। हृदय का आकार कार्डियोथोरैसिक अनुपात के साथ सामान्य सीमा के भीतर दिखाई देता है। कोई मध्यस्थ चौड़ा नहीं देखा गया। हड्डियों की संरचना में कोई तीव्र असामान्यताएं नहीं दिखती हैं। डायाफ्राम और कोस्टोफ्रेनिक कोण अक्षत हैं। समग्र निष्कर्ष एक सामान्य छाती का एक्स-रे है जिसमें तीव्र कार्डियोपल्मोनरी रोग का कोई रेडियोग्राफिक प्रमाण नहीं है।"
      });
    }, 2000); // 2 second delay to simulate API call
  });
};

// Header component
const Header = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

// Language tab component
const SummaryTabs = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'english' && styles.activeTab]} 
        onPress={() => onTabChange('english')}
      >
        <Text style={[styles.tabText, activeTab === 'english' && styles.activeTabText]}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'hindi' && styles.activeTab]} 
        onPress={() => onTabChange('hindi')}
      >
        <Text style={[styles.tabText, activeTab === 'hindi' && styles.activeTabText]}>Hindi</Text>
      </TouchableOpacity>
      <View 
        style={[
          styles.tabIndicator, 
          { left: activeTab === 'english' ? '0%' : '50%' }
        ]} 
      />
    </View>
  );
};

// Loading overlay component
const LoadingOverlay = ({ message }) => {
  return (
    <View style={styles.loadingOverlay}>
      <View style={styles.loadingContainer}>
        <View style={styles.spinner} />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </View>
  );
};

// Share options component
const ShareOptions = ({ onShare, onCopy, onSave }) => {
  return (
    <View style={styles.shareOptions}>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Ionicons name="share-social" size={24} color="white" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.shareButton} onPress={onCopy}>
        <Ionicons name="copy" size={24} color="white" />
        <Text style={styles.shareButtonText}>Copy</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.shareButton} onPress={onSave}>
        <Ionicons name="download" size={24} color="white" />
        <Text style={styles.shareButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ResultScreen() {
  const { imageUri } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('english');
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState({ english: '', hindi: '' });
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        setLoading(true);
        // Call our dummy API function
        const result = await processMedicalReport(imageUri);
        
        // Update the state with the results
        setSummaries({
          english: result.English_Summary,
          hindi: result.Hindi_Summary
        });
      } catch (error) {
        console.error('Error analyzing image:', error);
        Alert.alert('Error', 'Failed to analyze the medical document');
      } finally {
        setLoading(false);
      }
    };

    if (imageUri) {
      analyzeImage();
    }
  }, [imageUri]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleShare = async () => {
    try {
      const message = activeTab === 'english' ? summaries.english : summaries.hindi;
      await Share.share({
        message: message,
        title: 'Medical Report Analysis',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share summary');
    }
  };

  const handleCopy = () => {
    // In a real app, you would implement clipboard functionality here
    Alert.alert('Success', 'Summary copied to clipboard');
  };

  const handleSave = () => {
    // In a real app, you would save the analysis to local storage or cloud
    Alert.alert('Success', 'Analysis saved successfully');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Report Analysis"
        onBackPress={() => router.back()}
      />
      
      <ScrollView style={styles.content}>
        <Image 
          source={{ uri: imageUri }} 
          style={styles.reportImage}
          resizeMode="contain"
        />
        
        <SummaryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {activeTab === 'english' ? summaries.english : summaries.hindi}
          </Text>
        </View>
      </ScrollView>
      
      <ShareOptions
        onShare={handleShare}
        onCopy={handleCopy}
        onSave={handleSave}
      />
      
      {loading && <LoadingOverlay message="Analyzing medical report..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A6CBF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  reportImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'relative',
    marginVertical: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: '#757575',
  },
  activeTabText: {
    color: '#2A6CBF',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#2A6CBF',
    transition: 'left 0.3s ease',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#212121',
  },
  shareOptions: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#757575',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#f3f3f3',
    borderTopColor: '#2A6CBF',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
  },
});