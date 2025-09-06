import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SIZES } from '../../src/styles/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 1,
          title: 'Profile',
          subtitle: 'Manage your teaching profile',
          icon: 'person-outline',
          action: 'navigate',
          onPress: () => router.push('/profile')   // 👈 navigate
        },
        {
          id: 2,
          title: 'Class Information',
          subtitle: 'Update class details and settings',
          icon: 'school-outline',
          action: 'navigate',
          onPress: () => router.push('/class-info')  // 👈 navigate
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 3,
          title: 'Notifications',
          subtitle: 'Push notifications for updates',
          icon: 'notifications-outline',
          action: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
        {
          id: 4,
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: 'moon-outline',
          action: 'toggle',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled
        }
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          id: 5,
          title: 'Export Data',
          subtitle: 'Download your class data',
          icon: 'download-outline',
          action: 'navigate'
        },
        {
          id: 6,
          title: 'Privacy Settings',
          subtitle: 'Manage data privacy',
          icon: 'shield-outline',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          id: 7,
          title: 'Help & FAQ',
          subtitle: 'Get help and answers',
          icon: 'help-circle-outline',
          action: 'navigate'
        },
        {
          id: 8,
          title: 'Contact Support',
          subtitle: 'Reach out to our team',
          icon: 'mail-outline',
          action: 'navigate'
        }
      ]
    }
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}   // 👈 wire navigation
      disabled={item.action === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={item.icon} size={24} color={COLORS.primary} />
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.action === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={item.value ? 'white' : COLORS.textSecondary}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your app preferences</Text>
      </View>

      {settingsSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>NyansapoAI CLS v1.0.0</Text>
        <Text style={styles.footerText}>© 2024 All rights reserved</Text>
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  settingTitle: {
    fontSize: SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  settingRight: {
    marginLeft: SPACING.md,
  },
  footer: {
    padding: SPACING.xl,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
});
