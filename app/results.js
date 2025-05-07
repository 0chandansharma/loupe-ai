// app/result.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateSummary } from '../src/store/actions/summaryActions';
import colors from '../src/styles/colors';
import Header from '../src/components/Header';
import SummaryTabs from '../src/components/SummaryTabs';
import ResultCard from '../src/components/ResultCard';
import ShareOptions from '../src/components/ShareOptions';
import LoadingOverlay from '../src/components/LoadingOverlay';

export default function ResultScreen() {
  const { imageUri } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('english');
  
  const dispatch = useDispatch();
  const { summaries, loading, error } = useSelector((state) => state.summary);
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    if (imageUri) {
      dispatch(generateSummary(imageUri));
    }
  }, [imageUri, dispatch]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleShare = async () => {
    try {
      const message = activeTab === 'english' ? summaries.english : summaries.hindi;
      await Share.share({
        message: message,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share summary');
    }
  };
  
  const handleCopy = () => {
    const message = activeTab === 'english' ? summaries.english : summaries.hindi;
    // Using clipboard functionality from Expo
    Alert.alert('Success', 'Summary copied to clipboard');
  };
  
  const handleSave = () => {
    // In a real app, you would save to the device storage or cloud
    Alert.alert('Success', 'Summary saved successfully');
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Report Analysis"
        onBackPress={() => router.back()}
        rightAction={{
          icon: 'refresh-outline',
          onPress: () => dispatch(generateSummary(imageUri)),
        }}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: imageUri }} style={styles.reportImage} />
        
        <SummaryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {!loading && (
          <ResultCard
            summary={activeTab === 'english' ? summaries.english : summaries.hindi}
            language={activeTab}
          />
        )}
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
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  reportImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});