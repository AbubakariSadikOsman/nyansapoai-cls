import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassOverviewScreen from '../screens/ClassOverviewScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ClassOverview"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ClassOverview" 
        component={ClassOverviewScreen}
        options={{ title: 'Class Performance' }}
      />
      <Stack.Screen 
        name="StudentDetail" 
        component={StudentDetailScreen}
        options={{ title: 'Student Performance' }}
      />
    </Stack.Navigator>
  );
}


