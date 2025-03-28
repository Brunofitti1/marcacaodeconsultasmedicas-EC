import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>PEDRO LOPES DOMINGUES</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 30,
    color: '#0000FF',
    alignItems: 'center',
    fontWeight: 'bold'
  }
});
