import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Formulario from './src/components/Formulario';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <Text>Jonathan</Text>
      <Formulario />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27bdd1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
