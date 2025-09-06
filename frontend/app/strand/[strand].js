import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import StrandStudentsScreen from '../../src/screens/StrandStudentsScreen';

export default function StrandPage() {
  const { strand } = useLocalSearchParams();
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
  
  const route = {
    params: { 
      strand: decodeURIComponent(strand)
    }
  };
  
  return (
    <StrandStudentsScreen route={route} navigation={navigation} />
  );
}
