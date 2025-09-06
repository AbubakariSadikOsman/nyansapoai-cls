import React from 'react';
import { useRouter } from 'expo-router';
import AllStudentsScreen from '../src/screens/AllStudentsScreen';

export default function AllStudentsPage() {
  const router = useRouter();
  
  const navigation = {
    goBack: router.back,
    navigate: (screen, params) => {
      if (screen === 'StudentDetail') {
        // Passing the complete student data as a query parameter
        const studentData = encodeURIComponent(JSON.stringify(params.student));
        router.push(`/student/${params.student.id}?data=${studentData}`);
      }
    }
  };
  
  return (
    <AllStudentsScreen navigation={navigation} />
  );
}
