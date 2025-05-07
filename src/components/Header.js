import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Header = ({ title, onBackPress, rightAction }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.surface} />
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      {rightAction ? (
        <TouchableOpacity
          style={styles.rightAction}
          onPress={rightAction.onPress}
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Ionicons name={rightAction.icon} size={24} color={colors.surface} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: colors.surface,
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.medium,
    textAlign: 'center',
  },
  rightAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPlaceholder: {
    width: 40,
  },
});

export default Header;