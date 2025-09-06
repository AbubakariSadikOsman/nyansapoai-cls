import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES } from '../../src/styles/theme';

export default function ReportsScreen() {
  const reportTypes = [
    {
      id: 1,
      title: 'Class Performance Report',
      description: 'Overall class performance across all learning strands',
      icon: 'school-outline',
      date: '2025-09-05'
    },
    {
      id: 2,
      title: 'Individual Student Reports',
      description: 'Detailed performance reports for each student',
      icon: 'person-outline',
      date: '2025-09-05'
    },
    {
      id: 3,
      title: 'Strand Analysis Report',
      description: 'Performance analysis by learning strand',
      icon: 'analytics-outline',
      date: '2025-09-05'
    },
    {
      id: 4,
      title: 'Progress Tracking Report',
      description: 'Student progress over time',
      icon: 'trending-up-outline',
      date: '2025-09-05'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>Generate and view performance reports</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Generate New Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportsList}>
        {reportTypes.map((report) => (
          <TouchableOpacity key={report.id} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Ionicons name={report.icon} size={24} color={COLORS.primary} />
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </View>
            <Text style={styles.reportDescription}>{report.description}</Text>
            <View style={styles.reportActions}>
              <TouchableOpacity style={styles.reportAction}>
                <Ionicons name="eye-outline" size={16} color={COLORS.primary} />
                <Text style={styles.reportActionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportAction}>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
                <Text style={styles.reportActionText}>Download</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  actionsContainer: {
    padding: SPACING.md,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: SIZES.md,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  reportsList: {
    padding: SPACING.md,
  },
  reportCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 8,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reportInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  reportTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  reportDate: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  reportDescription: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  reportActionText: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
});
