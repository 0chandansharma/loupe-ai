// src/components/ShareOptions.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const ShareOptions = ({ onShare, onCopy, onSave }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={onShare}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="share-social" size={22} color="white" />
        </View>
        <Text style={styles.optionText}>Share</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={onCopy}>
        <View style={[styles.iconContainer, { backgroundColor: colors.info }]}>
          <Ionicons name="copy" size={22} color="white" />
        </View>
        <Text style={styles.optionText}>Copy</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={onSave}>
        <View style={[styles.iconContainer, { backgroundColor: colors.success }]}>
          <Ionicons name="download" size={22} color="white" />
        </View>
        <Text style={styles.optionText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  option: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
  },
});

export default ShareOptions;