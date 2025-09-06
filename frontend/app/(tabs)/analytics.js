import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../../src/styles/theme';
import ProgressBar from '../../src/components/ProgressBar';

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Class Analytics</Text>
        <Text style={styles.subtitle}>Performance insights and trends</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Class Performance</Text>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Average Progress</Text>
          <ProgressBar progress={65} height={20} />
          <Text style={styles.metricValue}>65%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Students Meeting Expectations</Text>
          <ProgressBar progress={75} height={20} />
          <Text style={styles.metricValue}>75%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Strand Performance</Text>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Letter Identification</Text>
          <ProgressBar progress={70} height={16} />
          <Text style={styles.metricValue}>70%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Letter Naming</Text>
          <ProgressBar progress={65} height={16} />
          <Text style={styles.metricValue}>65%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Letter Formation</Text>
          <ProgressBar progress={45} height={16} />
          <Text style={styles.metricValue}>45%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Phonemic Awareness</Text>
          <ProgressBar progress={80} height={16} />
          <Text style={styles.metricValue}>80%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: 32
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  metric: {
    marginBottom: SPACING.md,
  },
  metricLabel: {
    fontSize: SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  metricValue: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
});
