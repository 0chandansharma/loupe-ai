import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const GalleryPicker = ({ onSelectImage, onClose }) => {
  // In real app, fetch recent images from device gallery
  // For demo, we're showing placeholder images
  
  const placeholderImages = [
    { id: '1', uri: 'https://via.placeholder.com/150' },
    { id: '2', uri: 'https://via.placeholder.com/150' },
    { id: '3', uri: 'https://via.placeholder.com/150' },
    { id: '4', uri: 'https://via.placeholder.com/150' },
    { id: '5', uri: 'https://via.placeholder.com/150' },
    { id: '6', uri: 'https://via.placeholder.com/150' },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Image</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imagesContainer}>
        {placeholderImages.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={styles.imageWrapper}
            onPress={() => onSelectImage(image.uri)}
          >
            <Image source={{ uri: image.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  imageWrapper: {
    width: '33.33%',
    padding: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default GalleryPicker;