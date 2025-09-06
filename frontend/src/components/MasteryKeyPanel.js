import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPETENCE_LEVELS } from '../utils/constants';
import { COLORS, SPACING, FONTS, SIZES } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function MasteryKeyPanel() {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mastery Key</Text>
      </View>
      <View style={styles.legendContainer}>
        {Object.entries(COMPETENCE_LEVELS).map(([key, level]) => (
          <View key={key} style={styles.legendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: level.color }]} />
            <View style={styles.textContainer}>
              <Text style={styles.levelKey}>{key}</Text>
              <Text style={styles.levelLabel}>{level.label}</Text>
              <Text style={styles.levelDescription}>{level.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    margin: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  legendContainer: {
    gap: SPACING.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  levelKey: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  levelLabel: {
    fontSize: SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  levelDescription: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

