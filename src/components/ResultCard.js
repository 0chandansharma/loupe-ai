import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const ResultCard = ({ summary, language }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.summaryText}>{summary}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  scrollContent: {
    padding: 16,
  },
  summaryText: {
    fontSize: fonts.sizes.regular,
    color: colors.text,
    lineHeight: 24,
  },
});

export default ResultCard;