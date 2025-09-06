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
import { STRAND_KEYS, COMPETENCE_LEVELS } from '../utils/constants';
import { COLORS, SPACING, FONTS, SIZES } from '../styles/theme';
import CompetenceBadge from '../components/CompetenceBadge';
import ProgressBar from '../components/ProgressBar';

export default function StrandStudentsScreen({ route, navigation }) {
  const { strand } = route.params;
  const { students, loading, fetchStudents } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const strandStudents = useMemo(() => {
    if (!students) return [];
    return students.filter(s => {
      const strandKey = STRAND_KEYS[strand];
      return s.strands?.[strandKey]?.competence;
    });
  }, [students, strand]);

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

  const renderStudentItem = ({ item: student }) => {
    const strandKey = STRAND_KEYS[strand];
    const competence = student.strands?.[strandKey]?.competence;
    const studentProgress = student.strands?.[strandKey]?.progress || 0;
    const competenceData = COMPETENCE_LEVELS[competence];

    return (
      <TouchableOpacity
        style={styles.studentItem}
        onPress={() => handleStudentPress(student)}
        activeOpacity={0.7}
      >
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentId}>ID: {student.id}</Text>
          <Text style={styles.studentProgress}>Work Progress: {studentProgress}%</Text>
          <ProgressBar progress={studentProgress} height={6} color={competenceData.color} />
        </View>
        <View style={styles.studentBadge}>
          <CompetenceBadge level={competence} />
        </View>
      </TouchableOpacity>
    );
  };

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
          <Text style={styles.headerTitle}>{strand}</Text>
          <Text style={styles.headerSubtitle}>{strandStudents.length} students</Text>
        </View>
      </View>

      <FlatList
        data={strandStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No students found for this strand</Text>
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
    marginTop: SPACING.xl,
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
    marginBottom: SPACING.xs,
  },
  studentProgress: {
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
});
