import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS, SPACING, SIZES } from '../src/styles/theme';

export default function ProfileScreen() {
  const { email: initialEmail } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const handleSave = () => {
    if (!name.trim() || !subject.trim()) {
      Alert.alert('Error', 'Please fill out all fields (email is fixed)');
      return;
    }
    Alert.alert(
      'Profile Saved',
      `Name: ${name}\nEmail: ${initialEmail}\nSubject: ${subject}`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your teaching profile details here.</Text>

      {/* Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Field (Disabled) */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={initialEmail}
          placeholder={initialEmail}
          editable={false}   
        />
      </View>

      {/* Subject/Class Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Subject / Class</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subject or class"
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      {/* Save Button */}
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
  fieldContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  disabledInput: {
    backgroundColor: COLORS.border,
    color: COLORS.textSecondary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: SPACING.xl,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});
