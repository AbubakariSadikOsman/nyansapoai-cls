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

export default function AllStudentsScreen({ navigation }) {
  const { 
    students, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    fetchStudents 
  } = useApp();

  const [refreshing, setRefreshing] = useState(false);

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
      await fetchStudents();
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleStudentPress = (student) => {
    navigation.navigate('StudentDetail', { student });
  };

  const calculateStudentOverallProgress = (student) => {
    const totalProgress = LEARNING_STRANDS.reduce((sum, strand) => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = student.strands?.[strandKey];
      return sum + (strandData?.progress || 0);
    }, 0);
    return Math.round(totalProgress / LEARNING_STRANDS.length);
  };

  const getStudentOverallCompetence = (student) => {
    const competenceCounts = { BE: 0, AE: 0, ME: 0, EE: 0 };
    LEARNING_STRANDS.forEach(strand => {
      const strandKey = STRAND_KEYS[strand];
      const strandData = student.strands?.[strandKey];
      if (strandData?.competence) {
        competenceCounts[strandData.competence]++;
      }
    });
    
    // Return the most common competence level
    const maxCount = Math.max(...Object.values(competenceCounts));
    return Object.keys(competenceCounts).find(key => competenceCounts[key] === maxCount) || 'BE';
  };

  const renderStudentItem = ({ item: student }) => {
    const overallProgress = calculateStudentOverallProgress(student);
    const overallCompetence = getStudentOverallCompetence(student);
    const competenceData = COMPETENCE_LEVELS[overallCompetence];

    return (
      <TouchableOpacity
        style={styles.studentItem}
        onPress={() => handleStudentPress(student)}
        activeOpacity={0.7}
      >
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentId}>ID: {student.id}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Overall Progress: {overallProgress}%</Text>
            <ProgressBar progress={overallProgress} height={6} color={competenceData.color} />
          </View>
        </View>
        <View style={styles.studentBadge}>
          <CompetenceBadge level={overallCompetence} />
        </View>
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchStudents}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>All Students</Text>
          <Text style={styles.headerSubtitle}>{filteredStudents?.length || 0} students</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search students by name or ID..."
        />
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>
              {searchQuery ? 'No students found matching your search' : 'No students found'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: SPACING.md,
    padding: SPACING.xs,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  searchContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  listContainer: {
    padding: SPACING.md,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
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
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  studentId: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  progressContainer: {
    marginTop: SPACING.xs,
  },
  progressLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  studentBadge: {
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
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
});
