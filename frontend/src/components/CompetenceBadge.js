import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPETENCE_LEVELS } from '../utils/constants';
import { SPACING, FONTS, SIZES } from '../styles/theme';

export default function CompetenceBadge({ level }) {
  const competenceData = COMPETENCE_LEVELS[level] || COMPETENCE_LEVELS.BE;

  return (
    <View style={[styles.badge, { backgroundColor: competenceData.color }]}>
      <Text style={styles.badgeText}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: SIZES.xs,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});