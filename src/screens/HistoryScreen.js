// src/screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory, deleteFromHistory, clearHistory } from '../store/actions/historyActions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';

const HistoryScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.history);
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = async () => {
    await dispatch(fetchHistory());
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };
  
  const handleItemPress = (item) => {
    navigation.navigate('Result', { 
      imageUri: item.imageUri,
      fromHistory: true,
      historyItem: item 
    });
  };
  
  const handleDeleteItem = (itemId) => {
    Alert.alert(
      'Delete Scan',
      'Are you sure you want to delete this scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => dispatch(deleteFromHistory(itemId))
        }
      ]
    );
  };
  
  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all scan history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearHistory())
        }
      ]
    );
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleItemPress(item)}
    >
      <Image 
        source={{ uri: item.thumbnailUri || item.imageUri }} 
        style={styles.thumbnail}
      />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemDate}>{formatDate(item.timestamp)}</Text>
        <Text style={styles.itemSummary} numberOfLines={2}>
          {item.summaryEnglish}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons name="trash-outline" size={22} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Scan History"
        onBackPress={() => navigation.goBack()}
        rightAction={{
          icon: 'trash-outline',
          onPress: handleClearHistory
        }}
      />
      
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No scan history</Text>
          <Text style={styles.emptySubtext}>
            Medical reports you scan will appear here
          </Text>
        </View>
      )}
      
      {loading && !refreshing && <LoadingOverlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.divider,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemDate: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  itemSummary: {
    fontSize: fonts.sizes.regular,
    color: colors.text,
  },
  deleteButton: {
    padding: 8,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.medium,
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: fonts.sizes.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HistoryScreen;