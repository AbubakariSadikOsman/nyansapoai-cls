import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../src/styles/theme';

export default function ClassInfoScreen() {
  const [className, setClassName] = useState('');
  const [classSize, setClassSize] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');

  const handleSave = () => {
    if (!className || !classSize || !grade || !subject) {
      Alert.alert('Error', 'Please fill in all fields before saving.');
      return;
    }
    Alert.alert('Success', 'Class information updated successfully!');
    // TODO: Save to backend or local storage
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <Text style={styles.title}>Class Information</Text>
      <Text style={styles.subtitle}>Update your class details and settings here.</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Class Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter class name"
          value={className}
          onChangeText={setClassName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Class Size</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of students"
          value={classSize}
          onChangeText={setClassSize}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Grade</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter grade level (e.g., Grade 6)"
          value={grade}
          onChangeText={setGrade}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subject (e.g., Mathematics)"
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    marginTop: 32,
  },
  title: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    fontSize: SIZES.md,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  saveButtonText: {
    color: 'white',
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});
