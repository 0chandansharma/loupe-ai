// src/components/GalleryPicker.js - Updated with mock medical images
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const GalleryPicker = ({ onSelectImage, onClose }) => {
  // Mock images for testing
  const mockImages = [
    { 
      id: '1', 
      uri: 'https://www.healthimaging.com/sites/default/files/styles/media_image/public/mammogram.jpg?itok=a99pfmYN',
      type: 'Mammogram' 
    },
    { 
      id: '2', 
      uri: 'https://www.researchgate.net/publication/344398848/figure/fig1/AS:941206534447106@1601482962831/A-sample-of-chest-X-ray-images-from-the-NIH-Chest-X-ray-dataset-14.png',
      type: 'Chest X-Ray' 
    },
    { 
      id: '3', 
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_10nK3yJw8QQccKRQcA6tDy7ZXmjnOkToOg&usqp=CAU',
      type: 'Blood Report' 
    },
    { 
      id: '4', 
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHXvRExJUMPx7vdAb74jIKY1O8GTQM93kbQ&usqp=CAU',
      type: 'CT Scan' 
    },
    { 
      id: '5', 
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNZZvEZYjN6CezXxwkv8ZX3FDOz-EfmYTvl8ybYGJXDIBLRbVQ9ioA5jXGn_ECFNL9nIw&usqp=CAU',
      type: 'MRI' 
    },
    { 
      id: '6', 
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YeXCkHqR48sMBqvyWw0LWQwtpE-XH0tqcQ&usqp=CAU',
      type: 'Ultrasound'
    },
  ];
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.imageWrapper}
      onPress={() => onSelectImage(item.uri)}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.imageTypeContainer}>
        <Text style={styles.imageTypeText}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Medical Report</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.imagesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.medium,
    color: colors.text,
  },
  closeText: {
    fontSize: fonts.sizes.regular,
    color: colors.primary,
  },
  imagesContainer: {
    padding: 8,
  },
  imageWrapper: {
    width: '50%',
    padding: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  imageTypeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
    borderRadius: 4,
  },
  imageTypeText: {
    color: colors.surface,
    fontSize: fonts.sizes.small,
    textAlign: 'center',
  },
});

export default GalleryPicker;