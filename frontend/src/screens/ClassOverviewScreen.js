import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LEARNING_STRANDS, STRAND_KEYS, COMPETENCE_LEVELS } from '../utils/constants';
import { COLORS, SPACING, FONTS, SIZES } from '../styles/theme';
import SearchBar from '../components/SearchBar';
import CompetenceBadge from '../components/CompetenceBadge';
import ProgressBar from '../components/ProgressBar';
import MasteryKeysModal from '../components/MasteryKeysModal';

export default function ClassOverviewScreen({ navigation }) {
  const { 
    classData, 
    students, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    fetchClassData,
    fetchStudents 
  } = useApp();

  const [refreshing, setRefreshing] = useState(false);
  const [masteryKeysVisible, setMasteryKeysVisible] = useState(false);

  const MasteryKeysButton = () => (
    <TouchableOpacity onPress={() => setMasteryKeysVisible(true)}>
      <Ionicons 
        name="key-outline" 
        size={24} 
        color="black" 
        style={{ marginTop: -16 }}
      />
    </TouchableOpacity>
  );

  const filteredStudents = useMemo(() => {
    if (!students || !searchQuery) return students;
    return students.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchClassData(), fetchStudents()]);
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleStudentPress = (student) => {
    navigation.navigate('StudentDetail', { student });
  };

  const handleStrandPress = (strand) => {
    navigation.navigate('StrandStudents', { strand });
  };

  const renderMasteryKeyHeader = () => (
    <View style={styles.masteryKeySection}>
      <View style={styles.rowHeader} >
        <Text style={styles.masteryKeyTitle}>Mastery Key</Text>
        <MasteryKeysButton />
      </View>
      <View style={styles.competenceLevelsContainer}>
        {Object.entries(COMPETENCE_LEVELS).map(([code, data]) => (
          <View key={code} style={styles.competenceLevelItem}>
            <View style={[styles.competenceColorIndicator, { backgroundColor: data.color }]} />
            <View style={styles.competenceTextContainer}>
              <Text style={styles.competenceCode}>{code}</Text>
              <Text style={styles.competenceLabel}>{data.label}</Text>
            </View>
          </View>
        ))}
        <MasteryKeysModal 
          visible={masteryKeysVisible} 
          onClose={() => setMasteryKeysVisible(false)} 
        />
      </View>
    </View>
  );

  const renderStudentRow = ({ item: student }) => (
    <TouchableOpacity 
      style={styles.strandSection}
      onPress={() => handleStudentPress(student)}
      activeOpacity={0.7}
    >
      <Text style={styles.strandTitle}>{student.name}</Text>
      <CompetenceBadge 
        level={student.overallCompetence || 'BE'} 
      />
    </TouchableOpacity>
  );
  

  const renderStrandSection = ({ item: strand }) => {
    // Find the strand data from class_profile
    const strandData = classData?.strands?.find(s => s.strand === strand);
    const progress = strandData?.workCovered || 0;
    
    // Get students for this specific strand
    const strandStudents = students?.filter(s => {
      const strandKey = STRAND_KEYS[strand];
      return s.strands?.[strandKey]?.competence;
    }) || [];

    return (
      <TouchableOpacity 
        style={styles.strandSection}
        onPress={() => handleStrandPress(strand)}
        activeOpacity={0.7}
      >
        <View style={styles.strandHeader}>
          <View style={styles.strandTitleContainer}>
            <Text style={styles.strandTitle}>{strand}</Text>
            <Text style={styles.studentCount}>{strandStudents.length} students</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{progress}%</Text>
            <Text style={styles.progressLabel}>work covered</Text>
          </View>
        </View>
        <ProgressBar progress={progress} height={8} />
        
        <View style={styles.strandFooter}>
          <Text style={styles.tapToViewText}>Tap to view students in this strand</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchClassData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar 
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search students by name or ID..."
        />
        <TouchableOpacity 
          style={styles.peopleIconButton}
          onPress={() => navigation.navigate('AllStudents')}
        >
          <Ionicons name="people-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={searchQuery ? filteredStudents : LEARNING_STRANDS}
        renderItem={searchQuery ? renderStudentRow : renderStrandSection}
        keyExtractor={(item) => searchQuery ? item.id : item}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          !searchQuery && (
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Learning Strands Overview</Text>
                <Text style={styles.headerSubtitle}>
                  Tap on any strand to view detailed performance.
                </Text>
              </View>
              {renderMasteryKeyHeader()}
            </View>
          )
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? "No students found" : "No learning strands found"}
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  peopleIconButton: {
    marginLeft: SPACING.md,                                    
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  headerSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    margin: SPACING.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  rowHeader : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strandSection: {
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
  strandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  strandTitleContainer: {
    flex: 1,
  },
  strandTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  studentCount: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: SIZES.lg,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  strandFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tapToViewText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
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
    marginBottom: SPACING.lg,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  masteryKeySection: {
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
  masteryKeyTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  competenceLevelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  competenceLevelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: SPACING.sm,
  },
  competenceColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  competenceTextContainer: {
    flex: 1,
  },
  competenceCode: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  competenceLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },

});