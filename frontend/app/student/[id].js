import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import StudentDetailScreen from '../../src/screens/StudentDetailScreen';

export default function StudentPage() {
  const { id, data } = useLocalSearchParams();
  const router = useRouter();
  
  const navigation = {
    goBack: router.back
  };
  
  // Parsing the student data from query parameters
  let student = { id };
  if (data) {
    try {
      student = JSON.parse(decodeURIComponent(data));
    } catch (error) {
      console.log('Failed to parse student data from query params:', error);
    }
  }
  
  const route = {
    params: { 
      student 
    }
  };
  
  return (
    <StudentDetailScreen route={route} navigation={navigation} />
  );
}


