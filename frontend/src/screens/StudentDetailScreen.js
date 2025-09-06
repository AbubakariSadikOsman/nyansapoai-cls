import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LEARNING_STRANDS, COMPETENCE_LEVELS, STRAND_KEYS } from '../utils/constants';
import { COLORS, SPACING, FONTS, SIZES } from '../styles/theme';
import CompetenceBadge from '../components/CompetenceBadge';
import ProgressBar from '../components/ProgressBar';
import { useApp } from '../context/AppContext';

export default function StudentDetailScreen({ route, navigation }) {
  const { student } = route.params;
  const { students } = useApp();
  const [studentData, setStudentData] = useState(student);

  useEffect(() => {
    console.log('Student data received:', student);
    console.log('Student strands data:', student?.strands);
    if (student) {
      // Check if we have complete strand data
      if (student.strands && Object.keys(student.strands).length > 0) {
        // Use the passed student data directly since it contains all strand information
        setStudentData(student);
      } else {
        // Try to find the complete student data from the context
        const completeStudent = students?.find(s => s.id === student.id);
        if (completeStudent) {
          console.log('Found complete student data from context:', completeStudent);
          setStudentData(completeStudent);
        } else {
          console.log('Using incomplete student data:', student);
          setStudentData(student);
        }
      }
    }
  }, [student, students]);



  const handleDownloadReport = async () => {
    try {
      const reportData = generateReport();
      await Share.share({
        message: `Performance Report for ${studentData.name}\n\n${reportData}`,
        title: `${studentData.name} Performance Report`
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share report');
    }
  };

  const generateReport = () => {
    let report = `Student Performance Report\n`;
    report += `========================\n\n`;
    report += `Student Name: ${studentData.name}\n`;
    report += `Student ID: ${studentData.id}\n`;
    report += `Report Date: ${new Date().toLocaleDateString()}\n\n`;
    
    // Calculate overall performance
    const strandCount = LEARNING_STRANDS.length;
    const totalProgress = LEARNING_STRANDS.reduce((sum, strand) => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = studentData.strands?.[strandKey];
      return sum + (strandData?.progress || 0);
    }, 0);
    const averageProgress = Math.round(totalProgress / strandCount);
    
    report += `Overall Performance Summary:\n`;
    report += `- Average Progress: ${averageProgress}%\n`;
    report += `- Total Strands: ${strandCount}\n`;
    report += `- Completed Strands: ${calculateOverallPerformance().completedCount}\n\n`;
    
    report += `Detailed Strand Performance:\n`;
    report += `===========================\n\n`;
    
    LEARNING_STRANDS.forEach(strand => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = studentData.strands?.[strandKey];
      if (strandData) {
        const competence = COMPETENCE_LEVELS[strandData.competence];
        report += `${strand}:\n`;
        report += `  Competence Level: ${competence.label} (${strandData.competence})\n`;
        report += `  Work Progress: ${strandData.progress || 0}%\n`;
        report += `  Description: ${competence.description}\n\n`;
      }
    });
    
    return report;
  };

  const calculateOverallPerformance = () => {
    const strandCount = LEARNING_STRANDS.length;
    const totalProgress = LEARNING_STRANDS.reduce((sum, strand) => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = studentData.strands?.[strandKey];
      return sum + (strandData?.progress || 0);
    }, 0);
    const averageProgress = Math.round(totalProgress / strandCount);
    
    // Count completed strands (where work progress is 100%)
    const completedCount = LEARNING_STRANDS.reduce((count, strand) => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = studentData.strands?.[strandKey];
      return count + (strandData?.progress === 100 ? 1 : 0);
    }, 0);
    
    // Count competence levels
    const competenceCounts = { BE: 0, AE: 0, ME: 0, EE: 0 };
    LEARNING_STRANDS.forEach(strand => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = studentData.strands?.[strandKey];
      if (strandData?.competence) {
        competenceCounts[strandData.competence]++;
      }
    });
    
    return {
      averageProgress,
      totalStrands: strandCount,
      completedCount,
      competenceCounts
    };
  };

  const renderStrandCard = (strand) => {
    const strandKey = STRAND_KEYS[strand];
    const strandData = studentData?.strands?.[strandKey];
    
    console.log(`Rendering strand: ${strand}, key: ${strandKey}, data:`, strandData);
    
    // Since the db.json has complete data for all students, this should always have data
    if (!strandData) {
      console.warn(`No data found for strand: ${strand} with key: ${strandKey}`);
      return null;
    }

    const competence = COMPETENCE_LEVELS[strandData.competence];
    const progress = strandData.progress || 0;

    return (
      <View key={strand} style={styles.strandCard}>
        <View style={styles.strandHeader}>
          <View style={styles.strandTitleContainer}>
            <Text style={styles.strandTitle}>{strand}</Text>
            <Text style={styles.strandSubtitle}>Learning Strand</Text>
          </View>
          <CompetenceBadge level={strandData.competence} />
        </View>
        
        <View style={styles.strandMetrics}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Competence Level</Text>
            <View style={styles.competenceLevelContainer}>
              <View style={[styles.competenceLevelIndicator, { backgroundColor: competence.color }]} />
              <Text style={styles.competenceLevelText}>{competence.label}</Text>
            </View>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Work Progress</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>{progress}%</Text>
              <ProgressBar progress={progress} height={8} color={competence.color} />
            </View>
          </View>
        </View>
        
        <View style={styles.competenceDescriptionSection}>
          <Text style={styles.competenceDescriptionTitle}>Performance Description:</Text>
          <Text style={styles.competenceDescription}>
            {competence.description}
          </Text>
        </View>
      </View>
    );
  };

  if (!studentData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Student not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{studentData.name}</Text>
          <Text style={styles.studentId}>Student ID: {studentData.id}</Text>
        </View>
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={handleDownloadReport}
        >
          <Ionicons name="download-outline" size={20} color="white" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.studentStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateOverallPerformance().averageProgress}%</Text>
          <Text style={styles.statLabel}>Avg Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateOverallPerformance().totalStrands}</Text>
          <Text style={styles.statLabel}>Strands</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateOverallPerformance().completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.performanceSummary}>
        <Text style={styles.sectionTitle}>Performance Summary</Text>
        <View style={styles.summaryGrid}>
          {Object.entries(calculateOverallPerformance().competenceCounts).map(([level, count]) => {
            const competence = COMPETENCE_LEVELS[level];
            return (
              <View key={level} style={styles.summaryItem}>
                <View style={[styles.summaryIndicator, { backgroundColor: competence.color }]} />
                <Text style={styles.summaryCount}>{count}</Text>
                <Text style={styles.summaryLabel}>{level}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.strandsContainer}>
        <Text style={styles.sectionTitle}>Learning Strands Performance</Text>
        <Text style={styles.sectionSubtitle}>
          Detailed performance breakdown across all learning strands
        </Text>
        {console.log('Rendering strands for student:', studentData)}
        {console.log('Available strands:', studentData?.strands)}
        {LEARNING_STRANDS.map(renderStrandCard)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studentInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  studentName: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  studentId: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: SIZES.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  performanceSummary: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: SPACING.xs,
  },
  summaryCount: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  summaryLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  strandsContainer: {
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  strandCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  strandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  strandTitleContainer: {
    flex: 1,
  },

  strandTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  strandSubtitle: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  strandMetrics: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  metricItem: {
    marginBottom: SPACING.md,
  },
  metricLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
    marginRight: SPACING.sm,
    minWidth: 40,
  },
  competenceDescriptionSection: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  competenceDescriptionTitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  competenceLevelSection: {
    marginBottom: SPACING.md,
  },
  competenceLevelLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  competenceLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  competenceLevelIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  competenceLevelText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  competenceDescription: {
    fontSize: SIZES.sm,
    color: COLORS.text,
    lineHeight: 20,
  },
  noDataBadge: {
    backgroundColor: COLORS.textSecondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  noDataText: {
    color: 'white',
    fontSize: SIZES.xs,
    fontWeight: 'bold',
  },
  noDataContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  noDataMessage: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: SIZES.lg,
    color: COLORS.error,
    textAlign: 'center',
  },
});
