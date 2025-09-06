import React from 'react';
import 'react-native-url-polyfill/auto';
import { Stack } from 'expo-router';
import { AppProvider } from '../src/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="student/[id]" />
        <Stack.Screen name="index" />
      </Stack>
    </AppProvider>
  );
}


