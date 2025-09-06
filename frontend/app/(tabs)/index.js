import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ClassOverviewScreen from '../../src/screens/ClassOverviewScreen';

export default function ClassOverviewTab() {
  const router = useRouter();
  
  const navigation = {
    navigate: (screen, params) => {
      if (screen === 'StudentDetail') {
        // Passing the complete student data as a query parameter
        const studentData = encodeURIComponent(JSON.stringify(params.student));
        router.push(`/student/${params.student.id}?data=${studentData}`);
      } else if (screen === 'StrandStudents') {
        router.push(`/strand/${encodeURIComponent(params.strand)}`);
      } else if (screen === 'AllStudents') {
        router.push('/all-students');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ClassOverviewScreen navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    marginTop: 16
   },
});
