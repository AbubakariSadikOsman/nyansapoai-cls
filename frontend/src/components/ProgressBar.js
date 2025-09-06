import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styles/theme';

export default function ProgressBar({ progress, height = 8, color = COLORS.primary }) {
  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});