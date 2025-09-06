import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COMPETENCE_LEVELS } from '../utils/constants';
import { COLORS, SPACING, SIZES } from '../styles/theme';

export default function MasteryKeysModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Mastery Keys</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.subtitle}>
              Understanding competence levels and what they mean for student learning
            </Text>

            {Object.entries(COMPETENCE_LEVELS).map(([key, level]) => (
              <View key={key} style={styles.levelCard}>
                <View style={styles.levelHeader}>
                  <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                    <Text style={styles.levelBadgeText}>{key}</Text>
                  </View>
                  <Text style={styles.levelLabel}>{level.label}</Text>
                </View>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>
            ))}

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>How to Use These Levels</Text>
              <Text style={styles.infoText}>
                • <Text style={styles.bold}>BE (Below Expectation):</Text> Student needs additional support and intervention
              </Text>
              <Text style={styles.infoText}>
                • <Text style={styles.bold}>AE (Approaching Expectation):</Text> Student is developing skills with some support
              </Text>
              <Text style={styles.infoText}>
                • <Text style={styles.bold}>ME (Meeting Expectation):</Text> Student meets grade-level standards
              </Text>
              <Text style={styles.infoText}>
                • <Text style={styles.bold}>EE (Exceeding Expectation):</Text> Student demonstrates advanced mastery
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    margin: SPACING.lg,
    maxHeight: '80%',
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  content: {
    padding: SPACING.lg,
  },
  subtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  levelCard: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  levelBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  levelBadgeText: {
    color: 'white',
    fontSize: SIZES.sm,
    fontWeight: 'bold',
  },
  levelLabel: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  levelDescription: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  infoSection: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
});
