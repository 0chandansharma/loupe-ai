import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const SummaryTabs = ({ activeTab, onTabChange }) => {
  // Animation values
  const [indicatorPosition] = useState(new Animated.Value(0));
  
  // Animate the indicator when tab changes
  React.useEffect(() => {
    Animated.timing(indicatorPosition, {
      toValue: activeTab === 'english' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);
  
  // Interpolate the indicator position
  const translateX = indicatorPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'english' && styles.activeTab]}
          onPress={() => onTabChange('english')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'english' && styles.activeTabText,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hindi' && styles.activeTab]}
          onPress={() => onTabChange('hindi')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'hindi' && styles.activeTabText,
            ]}
          >
            Hindi
          </Text>
        </TouchableOpacity>
        
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
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
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.medium,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: colors.primary,
  },
});

export default SummaryTabs;